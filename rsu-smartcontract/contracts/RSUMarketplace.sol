// SPDX-License-Identifier: Multiverse Expert
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
contract RSUMarketplace is ReentrancyGuard, Pausable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter public _orderIds; // unique
    Counters.Counter public _offerIds;
    address public _recipientWallet;
    address public _poolWallet;
    uint256 public _feeRate = 2;
    uint256 public _refundPrice = 0.0001 ether;
    uint256 public _expTime = 4320 minutes; // for offers
    // --------------------- Struct Process --------------------- //
    enum MarketType {
        Marketplace,
        Auction
    }
    struct Order {
        address nftContract;
        address tokenAddress; // buy with token
        address seller;
        address buyer;
        uint256 orderId;
        uint256 tokenId;
        uint256 startPrice; // in case auction it's mean teminate price
        uint256 currentPrice;
        uint256 terminatePrice;
        uint256 expiration; // use only auction
        uint256 acceptTime; // use only auction
        uint256 refundPrice; // stake price before bidding
        bool isActive;
        MarketType marketType;
    }
    struct Bid {
        address bidder;
        uint256 bidPrice;
        uint256 bidTime;
        uint256 bidId;
        bool isAccept;
        bool isActive;
    }
    struct Refund {
        bool isBid;
        bool isRefund;
    }
    struct Offer { // offerer make offer -> owner approve offer -> offerer accpet offer
        address offerer;
        address tokenAddress;
        address nftContract;
        uint256 offerPrice;
        uint256 tokenId;
        uint256 offerId;
        uint256 offererAccExp; // time for offerer accept offer
        uint256 ownerAppExp; // time for owner approve offer
        bool isAccept;
        bool isActive;
        bool isOwnerApprove;
    }
    mapping(uint256 => Order) orders;
    mapping(uint256 => Bid[]) public bids;
    mapping(uint256 => mapping(address => Refund)) public refunds;
    mapping(address => Offer[]) public offers;
    constructor(address _recipt, address _pool){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _recipientWallet = _recipt;
        _poolWallet = _pool; // pool wallet
    }
    // ------------ Update Config Contract ---------- //
    function setIsPause(bool status) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if(status){
            _pause();
        } else {
            _unpause();
        }
    }
    function setOfferTimeRange (uint256 min) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(min > 0, "Invalid minutes");
        _expTime = min;
    }
    function updateFeeRate(uint256 feeRate) public onlyRole(DEFAULT_ADMIN_ROLE){
        require(feeRate <= 50); // rate percent
        _feeRate = feeRate;
    }
    function updateWallet(address receiptWallet, address poolWallet)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if(receiptWallet != address(0)){
            _recipientWallet = receiptWallet;
        }
        if(poolWallet != address(0)){
            _poolWallet = poolWallet;
        }
    }
    function updateRefundPrice(uint256 refundPrice)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(refundPrice > 0, "Refund price is incorrect");
        _refundPrice = refundPrice;
    }
     function withdrawCashFromContract(address token, address to) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).approve(to, balance);
        IERC20(token).transfer(to, balance);
    }
    // ---------- Event Process ---------- //
    event CreateOrderEvent  (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        address tokenAddress,
        address seller,
        uint256 expiration,
        uint256 price,
        MarketType marketType
    );
    event CancelOrderEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        bool isOrderActive,
        MarketType marketType
    );
    event BoughtEvent (
        address indexed nftContract,
        address indexed buyer,
        uint256 tokenId,
        MarketType indexed marketType,
        uint256 orderId,
        uint256 toSeller,
        uint256 fee,
        bool isOrderActive
    );
    event CreateOfferEvent (
        address indexed offerer,
        address indexed nftOwner,
        address nftContract,
        uint256 offerPrice,
        uint256 tokenId,
        uint256 offerId,
        bool isOfferActive
    );
    event CancelOfferEvent (
        address indexed offerer,
        address indexed nftOwner,
        address nftContract,
        uint256 offerPrice,
        uint256 tokenId,
        uint256 offerId,
        uint256 fee,
        bool isOfferActive
    );
    event AcceptOfferEvent (
        address indexed offerer,
        address indexed nftOwner,
        uint256 offerPrice,
        address nftContract,
        uint256 tokenId,
        uint256 offerId,
        uint256 fee,
        bool isOrderActive,
        bool isOfferAccept,
        bool isOfferActive
    );
    event BiddingEvent (
        address indexed nftContract,
        address bidder,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        uint256 bidPrice,
        uint256 bidTime,
        bool isBidActive
    );
    event WinnerAcceptBidEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        uint256 fee,
        bool isOrderActive,
        bool isBidAccept,
        uint256 acceptAtPrice
    );
    event CloseBidEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 latestBidPrice,
        bool isOrderActive
    );
    event CancelBidEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 fee,
        uint256 bidId,
        bool isBidActive
    );
    event DepositCashForBidEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 depositPrice,
        address bidder,
        bool isBidding,
        bool isRefund
    );
    event RefundBidEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 refundPrice,
        address bidder,
        bool isRefund
    );
    // ---------- Funtional Process ------ //
    function createOrder (
        address nftContract,
        address tokenAddress,
        uint256 tokenId,
        uint256 startPrice,
        uint256 expiration, // use only auciton
        uint256 terminatePrice, // use only auction
        MarketType marketType
    ) public nonReentrant returns (uint256) {
        uint256 orderId = _orderIds.current();
        _orderIds.increment();
        require(startPrice > 0, "Invaild Price");
        require(nftContract != address(0) && tokenAddress != address(0), "Invalid address");
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "You don't own the NFT"
        );
        require(orders[orderId].isActive == false, "Order is already active");
        if(marketType == MarketType.Auction){
            require(expiration + 1 days >= block.timestamp, "Expiration time is incorrect");
            bids[orderId].push(Bid(
                msg.sender,
                startPrice,
                block.timestamp,
                0, // bidId
                false,
                true
            ));
        }
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        orders[orderId] = Order (
            nftContract,
            tokenAddress,
            msg.sender,
            address(0), // buyer
            orderId,
            tokenId,
            startPrice,
            startPrice,
            terminatePrice,
            expiration,
            expiration + 1 days,
            _refundPrice,
            true,
            marketType
        );
        emit CreateOrderEvent(nftContract, orderId, tokenId, tokenAddress, msg.sender, expiration, startPrice, marketType);
        if(marketType == MarketType.Auction){
            emit BiddingEvent(nftContract, msg.sender, orderId, tokenId, startPrice, block.timestamp, true);
        }
        return orderId;
    }
    function cancelOrder(
        uint256 orderId
    ) public nonReentrant returns (uint256){
        Order memory orderData = orders[orderId];
        require(orderData.seller == msg.sender, "You don't own this order");
        require(orderData.isActive, "Already unactive");
        orders[orderId].isActive = false;
        address nftContract = orderData.nftContract;
        uint256 tokenId = orderData.tokenId;
        IERC721(nftContract).setApprovalForAll(msg.sender, true);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        emit CancelOrderEvent(nftContract, orderId, false, orderData.marketType);
        return orderData.orderId;
    }
    function buyOrder( // terminate buy when it's auction
        uint256 orderId
    ) public nonReentrant returns (uint256) {
        Order memory orderData = orders[orderId];
        require(orderData.isActive, "Order isn't active");
        require(orderData.seller != msg.sender, "You can't buy this auction");
        uint256 price = (orderData.marketType == MarketType.Auction) ? orderData.terminatePrice : orderData.startPrice;
        uint256 balance = IERC20(orderData.tokenAddress).balanceOf(msg.sender);
        uint256 fee = price * _feeRate / 100;
        require(
            balance >= price + fee,
            "Your balance isn't enough for price + fee"
        );
        orders[orderId].isActive = false;
        orders[orderId].buyer = msg.sender;
        IERC20(orderData.tokenAddress).transferFrom(
            msg.sender,
            _recipientWallet,
            fee
        ); // collect fee
        IERC20(orderData.tokenAddress).transferFrom(msg.sender, orderData.seller, price); // to seller
        IERC721(orderData.nftContract).setApprovalForAll(msg.sender, true);
        IERC721(orderData.nftContract).transferFrom(address(this), msg.sender, orderData.tokenId);
        emit BoughtEvent(orderData.nftContract, msg.sender, orderData.tokenId, orderData.marketType, orderId, price, fee, false);
        return orderData.orderId;
    }
    function bidAuction (
        uint256 orderId,
        uint256 bidPrice
    ) public nonReentrant returns (uint256){
        Order memory orderData = orders[orderId];
        Refund memory refundData = refunds[orderId][msg.sender];
        require(orderData.isActive, "Order isn't active");
        require(orderData.marketType == MarketType.Auction, "Only Auction process");
        require(bidPrice >= orderData.currentPrice, "BidPrice isn't enough");
        require(orderData.expiration >= block.timestamp, "Order is expired");
        require(refundData.isBid && refundData.isRefund == false, "Deposit to bidding first");
        require(orderData.seller != msg.sender, "Owner can't bidding");
        orders[orderId].currentPrice = bidPrice;
        bids[orderId].push(
            Bid(
                msg.sender,
                bidPrice,
                block.timestamp,
                bids[orderId].length,
                false,
                true
            )
        );
        emit BiddingEvent(orderData.nftContract, msg.sender, orderId, orderData.tokenId, bidPrice, block.timestamp, true);
        return orderData.orderId;
    }
    function closeBid(uint256 orderId) public nonReentrant returns(uint256){
        Order memory orderData = orders[orderId];
        require(orderData.seller == msg.sender, "You're not owned this order");
        require(orderData.isActive, "Order isn't active");
        require(orderData.expiration >= block.timestamp, "Already closed");
        require(orderData.marketType == MarketType.Auction, "Only Auction process");
        Bid memory bidWinner = getLatestBidder(orderId);
        if(bidWinner.bidder == msg.sender) {
            // creater is winner
            orders[orderId].isActive = false;
            IERC721(orderData.nftContract).setApprovalForAll(orderData.seller, true);
            IERC721(orderData.nftContract).transferFrom(address(this), orderData.seller, orders[orderId].tokenId);
        }
        orders[orderId].expiration = block.timestamp;
        emit CloseBidEvent(orderData.nftContract, orderId, bidWinner.bidPrice, true);
        return orderData.orderId;
    }
    function winnerAcceptBid(uint256 orderId) public nonReentrant returns(uint256) {
        Order memory orderData = orders[orderId];
        uint256 balance = IERC20(orders[orderId].tokenAddress).balanceOf(msg.sender);
        uint256 fee = orderData.currentPrice * _feeRate / 100;
        require(orderData.isActive, "Order isn't active");
        require(orderData.seller != msg.sender, "Owner can't accept");
        require(orderData.marketType == MarketType.Auction, "Only Auction process");
        require(
            orderData.acceptTime <= block.timestamp &&
            orderData.expiration >= block.timestamp
        , "Out of time to accept");
        require(balance >= fee + orderData.currentPrice, "Balance isn't enough (price + fee)");
        orders[orderId].isActive = false;
        orders[orderId].buyer = msg.sender;
        IERC20(orderData.tokenAddress).transferFrom(msg.sender, orders[orderId].seller, orderData.currentPrice);
        IERC20(orderData.tokenAddress).transferFrom(msg.sender, _recipientWallet, fee);
        IERC721(orderData.nftContract).setApprovalForAll(msg.sender, true);
        IERC721(orderData.nftContract).transferFrom(address(this), msg.sender, orders[orderId].tokenId);
        emit WinnerAcceptBidEvent(orderData.nftContract, orderId, orderData.tokenId, fee, false, true, orderData.currentPrice);
        return orderData.orderId;
    }
    function cancelBid (uint256 orderId, uint256 bidId) public nonReentrant returns(uint256){
        Order memory orderData = orders[orderId];
        Bid[] memory bidList = bids[orderId];
        require(orderData.marketType == MarketType.Auction, "Only Auction process");
        require(orderData.isActive, "Order isn't active");
        require(orderData.expiration >= block.timestamp, "Out of time to cancel");
        require(bidList[bidId].isActive && bidId >= 1, "Already unactive");
        uint256 fee = bids[orderId][bidId].bidPrice * _feeRate / 100;
        IERC20(orderData.tokenAddress).transferFrom(msg.sender, _recipientWallet, fee);
        if(orderData.currentPrice <= bids[orderId][bidId].bidPrice){
            // when bidPrice is greatest price
            for (uint256 i = bids[orderId].length - 1; i >= 0; i--){
                if(bids[orderId][i].isActive){
                    orders[orderId].currentPrice = bids[orderId][i].bidPrice;
                    break;
                }
            }
        }
        bids[orderId][bidId].isActive = false;
        emit CancelBidEvent(orderData.nftContract, orderId, fee, bidId, false);
        return orderData.orderId;
    }
    function depositCashForBid (uint256 orderId) public nonReentrant returns(uint256) {
        Refund memory refundData = refunds[orderId][msg.sender];
        Order memory orderData = orders[orderId];
        require(refundData.isBid == false && refundData.isRefund == false, "Already refund or bidding");
        require(orderData.expiration >= block.timestamp, "Out out bidding time");
        require(orderData.isActive, "Order isn't active");
        IERC20(orderData.tokenAddress).transferFrom(msg.sender, address(this), orderData.refundPrice);
        refunds[orderId][msg.sender].isBid = true;
        emit DepositCashForBidEvent(orderData.nftContract, orderId, orderData.refundPrice, msg.sender, true, false);
        return orderData.orderId;
    }
    function refundBidding(uint256 orderId) public nonReentrant returns(uint256) {
        Order memory orderData = orders[orderId];
        Refund memory refundData = refunds[orderId][msg.sender];
        require(refundData.isBid && refundData.isRefund == false, "Not ready for refund");
        require(orderData.expiration <= block.timestamp, "Not time for refund");
        Bid memory winner = getLatestBidder(orderId);
        if(winner.bidder == msg.sender){
            require(winner.isAccept, "Winner accept bid first");
        }
        refunds[orderId][msg.sender].isRefund = true;
        IERC20(orders[orderId].tokenAddress).approve(msg.sender, orders[orderId].refundPrice);
        IERC20(orders[orderId].tokenAddress).transfer(msg.sender, orders[orderId].refundPrice);
        emit RefundBidEvent(orderData.nftContract, orderId, orderData.refundPrice, msg.sender, true);
        return orderData.orderId;
    }
    function makeOffer(uint256 offerPrice, address tokenAddress, address nftOwner, uint256 tokenId, address nftContract) public nonReentrant  {
        uint256 balance = IERC20(tokenAddress).balanceOf(msg.sender);
        uint256 fee = offerPrice * _feeRate / 100;
        require(offerPrice > 0, "Incorrect offer price");
        require(balance >= offerPrice + fee, "Balance isn't enough");
        require(IERC721(nftContract).ownerOf(tokenId) == nftOwner, "Invalid owner");
        uint256 offerId = _offerIds.current();
        _offerIds.increment();
        offers[nftOwner].push(
            Offer(
                msg.sender,
                tokenAddress,
                nftContract,
                offerPrice,
                tokenId,
                offers[nftOwner].length,
                0,
                block.timestamp + _expTime,
                false,
                true,
                false
            )
        );
        emit CreateOfferEvent(msg.sender, nftOwner, nftContract, offerPrice, tokenId, offerId, true);
    }
    function ownerApproveOffer(uint256 offerId) public nonReentrant{
        Offer memory offerData = offers[msg.sender][offerId];
        require(offerData.isActive && offerData.isOwnerApprove == false, "Offer isn't active");
        require(offerData.ownerAppExp >= block.timestamp, "Out of time for approve offer");
        require(IERC721(offerData.nftContract).ownerOf(offerData.tokenId) == msg.sender, "You're not own asset");
        require(IERC721(offerData.nftContract).isApprovedForAll(msg.sender, address(this)), "You must approve asset to contract");
        offers[msg.sender][offerId].isOwnerApprove = true;
        offers[msg.sender][offerId].offererAccExp = block.timestamp + _expTime;
    }
    function cancelOffer(address nftOwner, uint256 offerId) public nonReentrant {
        Offer memory offerData = offers[nftOwner][offerId];
        require(offerData.offerer == msg.sender, "You're not offerer");
        require(offerData.isActive, "Already unactive");
        uint256 fee = offerData.offerPrice * _feeRate / 100;
        IERC20(offerData.tokenAddress).transferFrom(msg.sender, _recipientWallet, fee);
        offers[nftOwner][offerId].isActive = false;
        emit CancelOfferEvent(msg.sender, nftOwner, offerData.nftContract, offerData.offerPrice, offerData.tokenId, offerId, fee, false);
    }
    function offererAcceptOffer(uint256 offerId, address nftOwner) public nonReentrant {
        Offer memory offerData = offers[nftOwner][offerId];
        uint256 fee = offerData.offerPrice * _feeRate / 100;
        require(offerData.isActive, "Offer is unactive");
        require(offerData.isOwnerApprove, "Owner must accept offer first");
        require(offerData.offererAccExp <= block.timestamp, "Out off time for accept offer");
        IERC20(offerData.tokenAddress).transferFrom(msg.sender, nftOwner, offerData.offerPrice);
        IERC20(offerData.tokenAddress).transferFrom(msg.sender, _recipientWallet, fee);
        IERC721(offerData.nftContract).transferFrom(nftOwner, msg.sender, offerData.tokenId);
        offerData.isAccept = true;
        offerData.isActive = false;
        emit AcceptOfferEvent(offerData.offerer, msg.sender, offerData.offerPrice, offerData.nftContract, offerData.tokenId, offerId, fee, false, true, false);
    }
    // ------------------ Getter Function ---------------- //
    function getLatestBidder (
        uint256 orderId
    ) public view returns(Bid memory) {
        require(bids[orderId].length >= 1, "Order isn't created");
        for (uint256 i = bids[orderId].length - 1; i >= 0; i--) {
            if (bids[orderId][i].isActive) return bids[orderId][i];
        }
        return Bid(address(0), 0, 0, 0, false, false);
    }
    function getOrder (
        uint256 orderId
    ) public view returns(Order memory) {
        return orders[orderId];
    }
}