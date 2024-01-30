import AdWords from "./AdWords";

const AdWordsList = () => {
  const adWordList = [
    {
      icon: "/assets/rsu-image/icons/wallet.svg",
      title: "Set up your wallet",
      description: [
        "Once you've set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the ",
        <a href="#" className="text10">
          wallets we support.
        </a>,
      ],
    },
    {
      icon: "/assets/rsu-image/icons/collection2.svg",
      title: "Create your collection",
      description: [
        "Click ",
        <a href="#" className="text10">
          My Collections
        </a>,
        "and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.",
      ],
    },
    {
      icon: "/assets/rsu-image/icons/img-nft.svg",
      title: "Add your NFTs",
      description: [
        "Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.",
      ],
    },
    {
      icon: "/assets/rsu-image/icons/sale.svg",
      title: "Set up your wallet",
      description: [
        "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!",
      ],
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 layout03 mb-4" align="left">
          <p className="text03">Create and sell your NFTs</p>
        </div>
        <div className="row mb-3 pe-0">
          {adWordList.map((item) => {
            return (
              <AdWords
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdWordsList;
