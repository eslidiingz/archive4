import { Row, Col, Spinner } from "react-bootstrap";
import Search from "../form/search";
import Select from "../form/select";
import CardNFT from "../card/CardNFT";
import { useState } from "react";
import { useEffect } from "react";
import { useWalletContext } from "../../context/wallet";
import { smartContact, web3Provider } from "../../utils/providers/connector";
import Config from "../../configs/config";
import { getLogsEvent } from "../../utils/logs/getLogs";
import { id, Interface } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import CardTrending from "../card/CardTrending";
import { Multicall } from "ethereum-multicall";

const SetInventory = (props) => {
  const [nftList, setNftList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { wallet } = useWalletContext();
  const initialize = async () => {
    setIsLoading(true);
    console.log("Fetching inventory ...");
    await fetchMyNft();
    setIsLoading(false);
  };
  const fetchMyNft = async () => {
    const nftContract = smartContact(Config.ASSET_CA, Config.ASSET_ABI);

    const topics = [id("Transfer(address,address,uint256)")];
    const result = await getLogsEvent(
      nftContract,
      Config.ASSET_CA,
      Config.ASSET_BLOCK_START,
      topics
    );

    const args = result.map((_i) => _i.args);

    const ownerList = args.filter((_i) => _i.to === wallet);

    const ownerToken = ownerList.map((_i) =>
      BigNumber.from(_i.tokenId).toNumber()
    );

    const NFTList = await Promise.all(ownerToken);
    setNftList(NFTList);
  };
  useEffect(() => {
    if (props.page === "inventory") initialize();
  }, [props.page]);
  return (
    <>
      <Row className="my-4">
        <Col md={6} className="my-2">
          <Search />
        </Col>
        <Col md={3} className="my-2">
          <Select selected="Single Items" />
        </Col>
        <Col md={3} className="my-2">
          <Select selected="Price" />
        </Col>
      </Row>
      <Row>
        {!isLoading &&
          nftList.map((item, index) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                <CardTrending
                  nftAddress={Config.ASSET_CA}
                  tokenId={item.tokenId.toNumber()}
                />
              </div>
            );
          })}
      </Row>
    </>
  );
};
export default SetInventory;
