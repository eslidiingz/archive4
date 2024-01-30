import { useCallback, useEffect, useState } from "react";
import Config from "../../../configs/config";
import CardTrending from "../../card/CardTrending";
import { id } from "ethers/lib/utils";
import { providers } from "ethers/lib/ethers";
import { smartContact, web3Provider } from "../../../utils/providers/connector";
import { ethers } from "ethers";
import { getLogsEvent } from "../../../utils/logs/getLogs";

const MarketExplore = () => {
  const [marketList, setMarketList] = useState([]);

  const fetchMarketplaceList = useCallback(async () => {
    const getMarketplaceList = async () => {
      const contract = smartContact(
        Config.MARKETPLACE_CA,
        Config.MARKETPLACE_ABI,
        true
      );

      const topics = [
        id(
          "CreateOrderEvent(address,uint256,uint256,uint256,uint256,address,uint256,address,uint8,bool)"
        ),
      ];

      const marketList = await getLogsEvent(
        contract,
        Config.MARKETPLACE_CA,
        Config.MARKETPLACE_BLOCK_START,
        topics
      );

      setMarketList(marketList);
    };

    await getMarketplaceList();
  }, []);

  useEffect(() => {
    fetchMarketplaceList();
  }, [fetchMarketplaceList]);
  return (
    <div className="row">
      {marketList.map((item, index) => {
        return (
          <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
            <CardTrending
              tokenId={item?.args?.tokenId}
              nftAddress={item?.args?.nftContract}
              price={item?.args?.price}
              // img="assets/rsu-image/music/music-demo.png"
              // detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
              // time="5 days left"
              // fav="120"
              // price="153"
              // link="/Explore-collection/detail-music"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MarketExplore;
