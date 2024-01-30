// SPDX-License-Identifier:  Multiverse Expert
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
}

contract RSUMarket is ReentrancyGuard, ERC721Holder, Pausable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter public _orderIds;
    Counters.Counter public _offerIds;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 public auctionFees = 1000;
    uint256 public feesRate = 425;
    address recipientWallet;

    struct Order {
        address nftContract;
        uint256 orderId;
        uint256 tokenId;
        address seller;
        uint256 price;
        address buyWithTokenContract;
        bool isLocked;
        bool isSold;
    }

    struct Offer {
        address buyer;
        uint256 price;
        uint256 tokenId;
        uint256 offerId;
        address buyWithTokenContract;
        uint256 timeOfferStart;
        uint256 timeOfferEnd;
        bool isAccept;
        bool active;
    }

    /************************** Mappings *********************/
    mapping(uint256 => Order) public orders; // tokenid => Order
    //
    mapping(uint256 => Offer[]) private offers; // tokenid => Offer[]

    /************************** Events *********************/

    event OrderCreatedEvent(
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        address seller,
        uint256 price,
        address buyWithTokenContract,
        bool isLocked,
        bool isSold
    );

    event OrderCanceledEvent(
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        address seller,
        address buyWithTokenContract,
        bool isLocked,
        bool isSold
    );

    event BougthEvent(
        address indexed nftContract,
        uint256 indexed orderId,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price,
        uint256 fee,
        address buyWithTokenContract,
        bool locked,
        bool isSold
    );

    event CreateOfferEvent(
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 indexed offerId,
        uint256 price,
        address buyWithTokenContract,
        uint256 timeOfferStart,
        uint256 timeOfferEnd,
        bool isAccept,
        bool active
    );

    event CancelOfferEvent(
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 indexed offerId,
        bool active
    );

    event AcceptOfferEvent(
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 indexed offerId,
        address nftContract,
        address seller,
        uint256 price,
        bool isSold,
        bool isAccept,
        bool active
    );

    constructor(address _wallet) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        recipientWallet = _wallet;
    }

    /******************* Write Functions *********************/

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function updateFeesRate(uint256 newRate)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(newRate <= 500);
        feesRate = newRate;
    }

    function updateRecipientWallet(address newWallet)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(newWallet != address(0), "Wallet must not be address 0");
        recipientWallet = newWallet;
    }

    function updateAuctionFeesRate(uint256 newRate)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(newRate >= 500);
        auctionFees = newRate;
    }

    /*******************Read Functions *********************/

    function getOffer(uint256 tokenId) public view returns (Offer[] memory) {
        return offers[tokenId];
    }

    /******************* Action Functions *********************/

    /* Places an item for sale on the marketplace */
    function createOrder(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        address buyWithTokenContract
    ) public nonReentrant {
        require(orders[tokenId].isLocked == false, "NFT is locked");
        require(price > 0, "Price must be more than 0");
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "You don't own the NFT"
        );
        uint256 orderId = _orderIds.current();
        _orderIds.increment();
        orders[orderId] = Order(
            nftContract,
            orderId,
            tokenId,
            msg.sender,
            price,
            buyWithTokenContract,
            true,
            false
        );
        IERC721(nftContract).setApprovalForAll(address(this), true);
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        emit OrderCreatedEvent(
            nftContract,
            orderId,
            tokenId,
            msg.sender,
            price,
            buyWithTokenContract,
            true,
            false
        );
    }

    function cancelOrder(uint256 orderId) public nonReentrant {
        require(
            orders[orderId].seller == msg.sender,
            "You don't own the order"
        );
        require(orders[orderId].isLocked == true, "NFT isn't locked");
        require(
            orders[orderId].orderId == orderId,
            "This is not latest orderId"
        );
        uint256 tokenId = orders[orderId].tokenId;
        IERC721(orders[orderId].nftContract).setApprovalForAll(msg.sender, true);
        IERC721(orders[orderId].nftContract).transferFrom(address(this), msg.sender, tokenId);
        orders[orderId].isLocked = false;

        emit OrderCanceledEvent(
            orders[orderId].nftContract,
            orderId,
            tokenId,
            msg.sender,
            orders[orderId].buyWithTokenContract,
            false,
            false
        );
    }

    function Buy(uint256 tokenId, uint256 orderId) public nonReentrant {
        require(orders[orderId].isLocked == true, "NFT isn't locked");
        require(
            orders[orderId].orderId == orderId,
            "This is not latest orderId"
        );
        uint256 price = orders[orderId].price;
        address buyWithTokenContract = orders[orderId].buyWithTokenContract;
        uint256 balance = IERC20(buyWithTokenContract).balanceOf(msg.sender);
        uint256 fee = (price * feesRate) / 10000;
        uint256 amount = price + fee;
        address seller = orders[orderId].seller;

        address nftContract = orders[orderId].nftContract;
        require(
            balance >= amount,
            "Your balance has not enough amount + including fee."
        );
        //Transfer fee to recipientWallet.
        IERC20(buyWithTokenContract).transferFrom(
            msg.sender,
            recipientWallet,
            fee
        );
        //Transfer token(BUSD) to nft seller.
        IERC20(buyWithTokenContract).transferFrom(msg.sender, seller, price);
        // IERC721(nftContract).updateStatus(tokenId, msg.sender, price);
        // IERC721(nftContract).unlockNft(tokenId);
        IERC721(nftContract).setApprovalForAll(msg.sender, true);
        IERC721(nftContract).safeTransferFrom(address(this), msg.sender, tokenId);
        orders[orderId].isLocked = false;
        orders[orderId].isSold = true;

        emit BougthEvent(
            nftContract,
            orderId,
            tokenId,
            seller,
            msg.sender,
            price,
            fee,
            buyWithTokenContract,
            false,
            true
        );
    }

    /* Create an offer for specific order on the marketplace */
    function makeOffer(
        uint256 orderId,
        uint256 price,
        address buyWithTokenContract
    ) public nonReentrant {
        uint256 buyerBalance = IERC20(buyWithTokenContract).balanceOf(
            msg.sender
        );
        require(price > 0, "Price must be more than 0");
        require(buyerBalance >= price, "Balance: You do not have enough token");

        _offerIds.increment();
        uint256 offerId = _offerIds.current();

        offers[orderId].push(
            Offer(
                msg.sender,
                price,
                orders[orderId].tokenId,
                offerId,
                buyWithTokenContract,
                block.timestamp,
                block.timestamp + 20 minutes,
                false,
                true
            )
        );

        emit CreateOfferEvent(
            msg.sender,
            orders[orderId].tokenId,
            offerId,
            price,
            buyWithTokenContract,
            block.timestamp,
            block.timestamp + 20 minutes,
            false,
            true
        );
    }

    /* Cancel an offer for specific order on the marketplace */
    function cancelOffer(uint256 orderId, uint256 offerId) public nonReentrant {
        uint256 index;
        for (uint32 i; i < offers[orderId].length; i++) {
            if (offers[orderId][i].offerId == offerId) {
                index = i;
            }
        }
        require(
            offers[orderId][index].buyer == msg.sender,
            "You are not owner of the offer"
        );
        require(offers[orderId][index].active == true, "It's canceled item");

        offers[orderId][index].active = false;

        emit CancelOfferEvent(msg.sender, orders[orderId].tokenId, offerId, false);
    }

    function acceptOffer(
        uint256 orderId,
        uint256 offerId,
        address buyWithTokenContract,
        address nftContract
    ) public nonReentrant {
        uint256 index;
        uint256 tokenId =  orders[orderId].tokenId;
        for (uint32 i; i < offers[orderId].length; i++) {
            if (offers[orderId][i].offerId == offerId) {
                index = i;
            }
        }
        require(
            offers[orderId][index].isAccept == false,
            "This offer is already accepted"
        );
        require(
            offers[orderId][index].active == true,
            "This offer is not active"
        );
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "You aren't owner"
        );
        require(
            block.timestamp <= offers[tokenId][index].timeOfferEnd,
            "Buyer does not have enough token"
        );
        address buyerAddr = offers[tokenId][index].buyer;
        uint256 balance = IERC20(buyWithTokenContract).balanceOf(buyerAddr);

        uint256 price = offers[tokenId][index].price;
        uint256 fee = (price * feesRate) / 10000;
        uint256 amount = price + fee;

        require(balance >= amount, "Buyer does not have enough token");

        //Transfer fee to platform.
        IERC20(buyWithTokenContract).transferFrom(
            buyerAddr,
            recipientWallet,
            fee
        );

        //Transfer token(WolfCoin) to nft seller.
        IERC20(buyWithTokenContract).transferFrom(buyerAddr, msg.sender, price);

        require(orders[tokenId].isLocked == true, "NFT isn't locked");
        // IERC721(nftContract).unlockNft(tokenId);
        orders[tokenId].isLocked = false;
        orders[tokenId].isSold = true;
        IERC721(nftContract).setApprovalForAll(msg.sender, true);
        // IERC721(nftContract).updateStatus(tokenId, buyerAddr, price);
        IERC721(nftContract).safeTransferFrom(address(this), msg.sender, tokenId);

        offers[tokenId][index].isAccept = true;
        offers[tokenId][index].active = false;

        emit AcceptOfferEvent(
            buyerAddr,
            tokenId,
            offerId,
            nftContract,
            msg.sender,
            price,
            true,
            true,
            false
        );
    }
}
