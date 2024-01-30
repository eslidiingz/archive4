// SPDX-License-Identifier: Multiverse Expert
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
    function ownerOf(uint256 tokenId) external returns (address);
    function setApprovalForAll(address operator, bool approved) external;
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
    function transfer(address recipient, uint256 amount) external returns (bool);
}


contract RSUAuction is ReentrancyGuard, ERC721Holder, Pausable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter public _orderIds;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    address public _recipientWallet;
    uint256 public _feeRate = 2;
    uint256 public _refundPrice = 0.0001 ether;
    struct Order {
        address nftContract;
        address buyWithTokenContract;
        address seller;
        address buyer;
        uint256 orderId;
        uint256 tokenId;
        uint256 startPrice;
        uint256 currentPrice;
        uint256 expiration;
        uint256 acceptTime;
        uint256 terminatePrice;
        uint256 refundPrice;
        bool isLocked;
        bool isSold;
    }
    struct Bid{
        address bidder;
        uint256 bidPrice;
        uint256 bidTime;
        uint256 bidId;
        bool isAccept;
        bool isActive;
    }
    struct RefundModel {
        bool isBid;
        bool isRefund;
    }
    mapping(uint256 => Order) orders;
    mapping(uint256 => Bid[]) public Bids;
    mapping(uint256 => mapping(address => RefundModel)) isRefundable; // orderId -> owner -> fundData

    constructor(address _recipt){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _recipientWallet = _recipt;
    }
    // update configs function //
    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    function updateFeeRate(uint256 feeRate) public onlyRole(DEFAULT_ADMIN_ROLE){
        require(feeRate <= 50); // rate percent
        _feeRate = feeRate;
    }
    function updateRecipientWallet(address newWallet)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(newWallet != address(0), "Wallet must not be address 0");
        _recipientWallet = newWallet;
    }
    function updateRefundPrice(uint256 refundPrice)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(refundPrice > 0, "Refund price is incorrect");
        _refundPrice = refundPrice;
    }
    // event process
    event OrderCreatedEvent(
        address indexed nftContract,
        address seller,
        address buyWithTokenContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        uint256 expiration,
        uint256 startPrice,
        bool isLocked,
        bool isSold
    );
    event OrderCancelEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        address seller,
        address buyWithTokenContract,
        bool isLocked,
        bool isSold
    );
    event TerminateBuyOrder (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        address seller,
        address buyWithTokenContract,
        uint256 fee,
        uint256 price,
        bool isLocked,
        bool isSold
    );
    event BiddingEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        uint256 bidPrice
    );
    event WinnerAcceptBidEvent (
        address indexed nftContract,
        address buyWithTokenContract,
        uint256 indexed orderId,
        uint256 indexed tokenId
    );
    event CloseBidEvent (
        address indexed nftContract,
        uint256 indexed orderId
    );
    event CancelBidEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 bidId
    );
    event DepositCashForBidEvent (
        address indexed nftContract,
        uint256 indexed orderId,
        address bidder
    );
    event RefundBidEvent (
        address indexed nftContract,
        address bidder,
        uint256 indexed orderId
    );
    // Read Function //
    function getOrder(uint256 orderId) public view returns(Order memory){
        return orders[orderId];
    }
    function getBidWinner(uint256 orderId) public view returns(Bid memory, uint256 index){
        require(Bids[orderId].length >= 1, "Auction isn't start");
        for (uint256 i = Bids[orderId].length - 1; i >= 0; i--) {
            if (Bids[orderId][i].isActive) return (Bids[orderId][i], i);
        }
        return (Bid(address(0), 0, 0, 0, false, false), 0);
    }
    // Action Functions //
    function createAuction(
        address nftContract,
        address buyWithTokenContract,
        uint256 tokenId,
        uint256 startPrice,
        uint256 expiration,
        uint256 terminatePrice
    ) public nonReentrant{
        require(startPrice > 0, "Invalid Start Price");
        require(buyWithTokenContract != address(0), "Invalid token addresss");
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "You don't own the NFT"
        );
        require(expiration + 1 days >= block.timestamp, "Incorrect expiration");
        uint256 orderId = _orderIds.current();
        _orderIds.increment();
        require(orders[orderId].isLocked == false, "NFT is locked");
        IERC721(nftContract).setApprovalForAll(address(this), true);
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        orders[orderId] = Order(
            nftContract,
            buyWithTokenContract,
            msg.sender,
            address(0), // buyer,
            orderId,
            tokenId,
            startPrice,
            startPrice, // currentPrice
            expiration,
            expiration + 1 days, // acceptTime,
            terminatePrice,
            _refundPrice,
            true, // isLocked
            false // isSold
        );
        bidAuction(orderId, startPrice);
        emit BiddingEvent(nftContract, orderId, tokenId, startPrice);
        emit OrderCreatedEvent (
            nftContract,
            msg.sender,
            buyWithTokenContract,
            orderId,
            tokenId,
            expiration,
            startPrice,
            true,
            false
        );
    }
    function cancelOrder(
        uint256 orderId
    ) public nonReentrant{
        require(orders[orderId].seller == msg.sender, "You don't own this order");
        require(orders[orderId].isLocked, "NFT isn't locked");
        require(orders[orderId].orderId == orderId, "This isn't latest orderId");
        orders[orderId].isLocked = false;
        address nftContract = orders[orderId].nftContract;
        uint256 tokenId = orders[orderId].tokenId;
        IERC721(nftContract).setApprovalForAll(msg.sender, true);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        emit OrderCancelEvent(
            nftContract,
            orderId,
            tokenId,
            orders[orderId].seller,
            orders[orderId].buyWithTokenContract,
            false,
            false
        );
    }
    function terminateBuy(
        uint256 orderId
    ) public nonReentrant{
        require(orders[orderId].isLocked, "NFT isn't locked");
        uint256 price = orders[orderId].terminatePrice;
        address buyWithTokenContract = orders[orderId].buyWithTokenContract;
        uint256 balance = IERC20(buyWithTokenContract).balanceOf(msg.sender);
        uint256 fee = price * _feeRate / 100;
        uint256 tokenId = orders[orderId].tokenId;
        address seller = orders[orderId].seller;
        address nftContract = orders[orderId].nftContract;
        require(
            balance >= price + fee,
            "Your balance isn't enough for price + fee"
        );

        IERC20(buyWithTokenContract).transferFrom(
            msg.sender,
            _recipientWallet,
            fee
        );
        IERC20(buyWithTokenContract).transferFrom(msg.sender, seller, price);
        IERC721(nftContract).setApprovalForAll(msg.sender, true);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        orders[orderId].isLocked = false;
        orders[orderId].isSold = true;

        emit TerminateBuyOrder(
            nftContract,
            orderId,
            tokenId,
            seller,
            buyWithTokenContract,
            fee,
            price,
            false,
            true
        );
    }
    function bidAuction(
        uint256 orderId,
        uint256 bidPrice
    ) public nonReentrant {
        require(orders[orderId].isLocked, "NFT isn't locked");
        Bid[] memory bidData = Bids[orderId];
        uint256 bidLatestIndex = (bidData.length == 0) ? 0 : bidData.length - 1; // bug
        require(bidData[bidLatestIndex].bidPrice < bidPrice, "BidPrice is not enough");
        require(orders[orderId].expiration >= block.timestamp, "Out of time to bidding");
        require(isRefundable[orderId][msg.sender].isBid && isRefundable[orderId][msg.sender].isRefund == false, "Not ready for bidding");
        Bids[orderId].push(Bid(
            msg.sender,
            bidPrice,
            block.timestamp,
            Bids[orderId].length,
            false,
            true
        ));
        emit BiddingEvent(orders[orderId].nftContract, orderId, orders[orderId].tokenId, bidPrice);
    }
    function closeBid(uint256 orderId) public nonReentrant {
        require(orders[orderId].seller == msg.sender, "You're not owned this order");
        require(orders[orderId].isLocked && orders[orderId].isSold == false, "NFT isn't locked or already sold");
        (Bid memory winner, ) = getBidWinner(orderId);
        address nftContract = orders[orderId].nftContract;
        if(winner.bidder == msg.sender){
            orders[orderId].isLocked = false;
            // transfer to owner item
            IERC721(nftContract).setApprovalForAll(msg.sender, true);
            IERC721(nftContract).transferFrom(address(this), msg.sender, orders[orderId].tokenId);
        }
        orders[orderId].expiration = block.timestamp;
        emit CloseBidEvent(nftContract, orderId);
    }
    function winnerAcceptBid(uint256 orderId) public nonReentrant{
        (Bid memory winner, ) = getBidWinner(orderId);
        require(winner.isActive && winner.bidder == msg.sender, "Winner isn't active");
        require(orders[orderId].isLocked, "NFT isn't locked");
        require(
            orders[orderId].acceptTime >= block.timestamp &&
            block.timestamp >= orders[orderId].expiration,
            "Out of acceptTime"
        );
        require(orders[orderId].isSold == false, "Order is already sold");
        uint256 fee = winner.bidPrice * _feeRate / 100;
        uint256 finalPrice = winner.bidPrice + fee;
        uint256 balance = IERC20(orders[orderId].buyWithTokenContract).balanceOf(msg.sender);
        require(finalPrice <= balance, "Balance isn't enough");
        address nftContract = orders[orderId].nftContract;
        IERC20(orders[orderId].buyWithTokenContract).transferFrom(msg.sender, orders[orderId].seller, winner.bidPrice);
        IERC20(orders[orderId].buyWithTokenContract).transferFrom(msg.sender, _recipientWallet, fee);
        IERC721(nftContract).setApprovalForAll(msg.sender, true);
        IERC721(nftContract).transferFrom(address(this), msg.sender, orders[orderId].tokenId);
        emit WinnerAcceptBidEvent(nftContract, orders[orderId].buyWithTokenContract, orderId, orders[orderId].tokenId);
    }
    function cancelBid(uint256 orderId, uint256 bidId) public nonReentrant{
        require(Bids[orderId][bidId].bidder == msg.sender, "You're not bidder");
        require(orders[orderId].isLocked, "NFT isn't locked");
        uint256 fee = Bids[orderId][bidId].bidPrice * _feeRate / 100;
        IERC20(orders[orderId].buyWithTokenContract).transferFrom(msg.sender, _recipientWallet, fee);
        Bids[orderId][bidId].isActive = false;
        emit CancelBidEvent(orders[orderId].nftContract, orderId, bidId);
    }
    function depositCashForBid(uint256 orderId) public nonReentrant {
        require(isRefundable[orderId][msg.sender].isBid == false, "Already deposit");
        require(orders[orderId].expiration >= block.timestamp, "Order is expired");
        require(orders[orderId].isLocked, "NFT isn't locked");
        IERC20(orders[orderId].buyWithTokenContract).transferFrom(msg.sender, address(this), orders[orderId].refundPrice);
        isRefundable[orderId][msg.sender].isBid = true;
        emit DepositCashForBidEvent(orders[orderId].nftContract, orderId, msg.sender);
    }
    function withdrawCashFromContract(address token) public whenPaused onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).approve(msg.sender, balance);
        IERC20(token).transfer(msg.sender, balance);
    }
    function refundBid(uint256 orderId) public whenNotPaused nonReentrant {
        (Bid memory winner, ) = getBidWinner(orderId);
        if(winner.bidder == msg.sender && orders[orderId].isLocked == false){
            require(winner.isAccept, "Accept Order first");
        }
        require(isRefundable[orderId][msg.sender].isBid && isRefundable[orderId][msg.sender].isRefund == false, "Not ready for refund");
        require(block.timestamp >= orders[orderId].expiration, "Order isn't expired");
        isRefundable[orderId][msg.sender].isRefund = true;

        IERC20(orders[orderId].buyWithTokenContract).approve(msg.sender, orders[orderId].refundPrice);
        IERC20(orders[orderId].buyWithTokenContract).transfer(msg.sender, orders[orderId].refundPrice);
        emit RefundBidEvent(orders[orderId].nftContract, msg.sender, orderId);
    }
}