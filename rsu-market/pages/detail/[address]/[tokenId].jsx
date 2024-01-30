import { useCallback, useState } from "react";
import Link from "next/link";
import Mainlayout from "../../../components/layouts/Mainlayout";
import React from "react";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Col, Nav, Spinner } from "react-bootstrap";
import CardBuy from "../../../components/card/CardBuy";
import DeatilBuy from "../../../components/form/DeatilBuy";
import { Table, Tabs, Tab } from "react-bootstrap";
import Search from "../../../components/form/search";
import Select from "../../../components/form/select";
import { useEffect } from "react";
import { smartContact, web3Provider } from "../../../utils/providers/connector";
import Config from "../../../configs/config";
import { useWalletContext } from "../../../context/wallet";
import { GetShortAddress } from "../../../utils/ethers/connect-metamask";
import { useRouter } from "next/router";
import { BigNumber } from "ethers";
import LatestBid from "../../../components/history/latest";
import { formatEther, id } from "ethers/lib/utils";
import { gqlAssetReturning } from "../../../models/Asset";
import { gqlQuery } from "../../../models/GraphQL";
import OfferList from "../../../components/history/offer";
import ButtonCheckout from "../../../components/detail/ButtonCheckout";
import ConfirmCheckout from "../../../components/modal/ComfirmCheckout";
import useModal from "../../../hooks/useModal";
import DescriptionCard from "../../../components/detail/DescriptionCard";
import DetailCard from "../../../components/detail/DetailCard";

const ExploreCollectionDetailmusic = () => {
  const { visible, toggle } = useModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const [feeRate, setFeeRate] = useState(null);
  const router = useRouter();
  const { address, tokenId } = router.query;
  const { wallet } = useWalletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuction, setIsAuction] = useState(false);
  const [owner, setOwner] = useState(null);
  const [order, setOrder] = useState(null);
  const [modalContext, setModalContext] = useState();
  const [symbol, setSymbol] = useState(null);
  const [metadata, setMetadata] = useState({
    name: null,
    description: null,
    image: null,
    creator: null,
  });
  const [marketData, setMarketData] = useState({
    nftContract: null,
    tokenId: null,
    startPrice: null,
  });
  const [latestBid, setLatestBid] = useState([
    {
      image: "../../../assets/rsu-image/user/Ellipse.svg",
      bidder: "0xE40845297c6693863Ab3E10560C97AACb32cbc6C",
      bidPrice: "10",
    },
    {
      image: "../../../assets/rsu-image/user/Ellipse.svg",
      bidder: "0xE40845297c6693863Ab3E10560C97AACb32cbc6C",
      bidPrice: "5",
    },
    {
      image: "../../../assets/rsu-image/user/Ellipse.svg",
      bidder: "0xE40845297c6693863Ab3E10560C97AACb32cbc6C",
      bidPrice: "3",
    },
  ]);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };
  const [isBuynow, setBuynow] = useState(false);
  const Buynow = () => {
    setBuynow(!isBuynow);
  };

  const fetchFee = useCallback(async () => {
    if (!router.isReady) return;
    const marketContract = smartContact(
      Config.MARKETPLACE_CA,
      Config.MARKETPLACE_ABI,
      true
    );
    const feeRate = await marketContract._feeRate();
    setFeeRate(BigNumber.from(feeRate).toNumber());
  }, []);

  const fetchNFTMetadata = useCallback(async () => {
    if (!router.isReady) return;
    const query = `metadata(where: {token_id: {_eq: ${tokenId}}, nft_address: {_eq: "${Config.ASSET_CA}"}})
      ${gqlAssetReturning}
    `;

    const { data } = await gqlQuery(query);

    if (data.length > 0) {
      const { creator, metadata } = data[0];
      const { name, description, image } = metadata;

      setMetadata({ name, description, image, creator });
    }
  }, []);

  const fetchOrderMarketplace = useCallback(async () => {
    if (!router.isReady) return;
    const marketContract = smartContact(
      Config.MARKETPLACE_CA,
      Config.MARKETPLACE_ABI,
      true,
      "fetchOrderMarketplace"
    );

    const query = marketContract.filters.CreateOrderEvent(
      address,
      null,
      parseInt(tokenId)
    );

    const latestBlock = await web3Provider(null, true).getBlockNumber();

    const result = await marketContract.queryFilter(
      query,
      Config.MARKETPLACE_BLOCK_START,
      latestBlock
    );

    if (result.length > 0) {
      const orderId = result[0]?.args?.orderId;
      const data = result[0]?.args;

      setOrder({ id: orderId, data });
    }
  }, []);

  const fetchMarketplace = useCallback(async () => {
    if (order === null) return;

    const erc20Contract = smartContact(
      order?.data?.tokenAddress,
      Config.ERC20_ABI,
      true,
      "fetchMarketplace"
    );

    const tokenSymbol = await erc20Contract.symbol();

    setSymbol(tokenSymbol);
  }, [order]);

  useEffect(() => {
    fetchMarketplace();
  }, [fetchMarketplace]);

  useEffect(() => {
    fetchOrderMarketplace();
  }, [fetchOrderMarketplace]);

  useEffect(() => {
    fetchNFTMetadata();
  }, [fetchNFTMetadata]);

  useEffect(() => {
    fetchFee();
  }, [fetchFee]);

  return (
    <>
      <div>
        {/* section 1  */}
        <section className="hilight-sections">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 hilight-content2-3 mt-4">
                <p className="text-tittle_ex">Detail</p>
                <p>Lorem Ipsum is simply dummy</p>
              </div>
              <div className="col-lg-6 hilight-content2-3 hilight-content2-3-2 mt-4">
                <p className="text-navgation">
                  <Link href="/">
                    <a className="text-navation_mr">Home</a>
                  </Link>{" "}
                  &gt;
                  <Link href="/Explore-collection/item">
                    <a className="text-white text-navation_mr">Collections</a>
                  </Link>{" "}
                  &gt;
                  <Link href="/Explore-collection">
                    <a className="text-white text-navation_mr">Explore</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* end-section 1  */}
        {/* section 2  */}
        <section className="bg-blue">
          <div className="container">
            <div className="row pb-5 pt-3">
              <div className="col-lg-7 mt-4 mb-5">
                <div>
                  <div className="img-player2">
                    <img
                      className="card-img-top img-card"
                      src={
                        metadata?.image ||
                        "/assets/rsu-image/music/music-demo.png"
                      }
                      alt="Card image"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "/assets/rsu-image/music/music-demo.png";
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-5 mt-4 mb-6">
                <p className="text-tittle_detail">{metadata?.name}</p>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="row box">
                      <div className="col-12">
                        <div className="d-flex gap-2 align-items-center ">
                          <div className="img-user">
                            <img src="/assets/rsu-image/user/Ellipse.svg" />
                          </div>
                          <div>
                            <p className="text_profile_ex">Owned by</p>
                            <p className="text_profile_ex02">
                              {order?.data?.seller
                                ? GetShortAddress(order?.data?.seller)
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="layout-profile_ex">
                  {isAuction && (
                    <>
                      <p className="text-detail_ex">
                        Sale ends 04 March 2022 at 3.05am +7
                      </p>
                      <p className="text-detail-time_ex">11h : 23m : 45s</p>
                      <hr className="text-detail-hr_ex" />
                      <p className="text-detail_ex">Minimum bid -- </p>
                    </>
                  )}
                  <p className="text09-2 mt-4 mb-4">
                    <img
                      className="layout-profile02_ex"
                      src="../../../assets/rsu-image/icons/coin.svg"
                    />
                    &nbsp;
                    <span className="text-detail02_ex">
                      {order?.data?.price ? formatEther(order?.data?.price) : 0}{" "}
                      {symbol}
                    </span>{" "}
                    {/*<span className="text-detail_ex">&nbsp;( 233$ )</span> */}
                  </p>

                  <div className="row">
                    <div className="col-12 col-sm-6 mb-2">
                      <ButtonCheckout
                        buttonClass={"btn2 w-full h-36"}
                        buttonName={"Make Offer"}
                        children={
                          <ConfirmCheckout
                            title={"Make Offer"}
                            data={metadata}
                            order={order}
                            fee={feeRate}
                          />
                        }
                      />
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      {order?.data?.seller !== wallet &&
                        order?.data?.isOrderActive && (
                          <ButtonCheckout
                            buttonClass={"btn-hover color-1 w-full h-36"}
                            buttonName={"Buy Now"}
                            children={
                              <ConfirmCheckout
                                title={"Buy Now"}
                                data={metadata}
                                order={order}
                                fee={feeRate}
                              />
                            }
                          />
                        )}
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      <button className="btnclose w-full h-36">
                        Close Bid
                      </button>
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      {order?.data?.seller === wallet &&
                        !order?.data?.isOrderActive && (
                          <Link href={`/Profile/${address}/${tokenId}`}>
                            <button className="btn-hover color-1 w-full h-36">
                              Sell
                            </button>
                          </Link>
                        )}
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      <button className="btnclose w-full h-36">
                        Cancel Sell
                      </button>
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      <button className="btn-hover color-1 w-full h-36">
                        <i
                          className="far fa-circle-notch"
                          style={{ transform: "rotate(90deg)" }}
                        ></i>{" "}
                        Bid
                      </button>
                    </div>
                  </div>
                </div>
                <LatestBid />
              </div>

              <div className="col-xl-4">
                <DescriptionCard
                  creator={
                    metadata?.creator
                      ? GetShortAddress(metadata?.creator)
                      : null
                  }
                  description={
                    metadata?.description ? metadata?.description : null
                  }
                />
              </div>
              <div className="col-xl-8">
                <OfferList />
              </div>

              <div className="col-xl-3">
                <DetailCard order={order} feeRate={feeRate} />
              </div>
              <div className="col-xl-9">
                <div className="layout_main-acc">
                  <p className="text-tittle-des">Item Activity</p>
                </div>
                <div className="layout-des_sub-detailpage">
                  <Select selected="Filter" />
                  <div className="d-flex mt-lg-3">
                    <button
                      className={`btn btn-filter active`}
                      onClick={Buynow}
                    >
                      <i className="fal fa-times mgr-8 c-pointer"></i> Sales
                    </button>
                    <button
                      className={`btn btn-filter active mx-lg-3`}
                      onClick={Buynow}
                    >
                      <i className="fal fa-times mgr-8 c-pointer"></i> Buy now
                    </button>
                  </div>
                  <div className="col-12 mt-lg-3 exp-table">
                    <Table borderless responsive hover>
                      <thead>
                        <tr className="bd-bottom">
                          <th className="py-3">
                            <p className="mb-0">Eent</p>
                          </th>
                          <th className="py-3">
                            <p className="mb-0">Price</p>
                          </th>
                          <th className="py-3">
                            <p className="mb-0">From</p>
                          </th>
                          <th className="py-3">
                            <p className="mb-0">To</p>
                          </th>
                          <th className="py-3">
                            <p className="mb-0">Date</p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 ">
                              <i className="fas fa-shopping-cart"></i>
                              <div>
                                <p className="mb-0">Sale</p>
                              </div>
                            </div>
                          </td>

                          <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 ">
                              <img
                                width={10}
                                alt=""
                                src="/assets/rsu-image/icons/coin.svg"
                              />
                              <div>
                                <p className="mb-0">0.64</p>
                              </div>
                            </div>
                          </td>
                          <td className="pt-4 pb-3">
                            <p className="mb-0">478BC478BC478BC478BC</p>
                          </td>
                          <td className="pt-4 pb-3">
                            <p className="mb-0">417777417777417777417777</p>
                          </td>
                          <td className="pt-4 pb-3">
                            <Link href={""}>
                              <div className=" d-flex gap-2 align-items-start ">
                                <p className="mb-0 ci-purple textprofile-des_link">
                                  3 day ago{" "}
                                  <i className="fas fa-external-link"></i>
                                </p>
                              </div>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 ">
                              <i className="fas fa-exchange-alt"></i>
                              <div>
                                <p className="mb-0">Transfer</p>
                              </div>
                            </div>
                          </td>

                          <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 ">
                              <img
                                width={10}
                                alt=""
                                src="/assets/rsu-image/icons/coin.svg"
                              />
                              <div>
                                <p className="mb-0">0.64</p>
                              </div>
                            </div>
                          </td>
                          <td className="pt-4 pb-3">
                            <p className="mb-0">478BC</p>
                          </td>
                          <td className="pt-4 pb-3">
                            <p className="mb-0">417777</p>
                          </td>
                          <td className="pt-4 pb-3">
                            <Link href={""}>
                              <div className=" d-flex gap-2 align-items-start ">
                                <p className="mb-0 ci-purple textprofile-des_link">
                                  3 day ago{" "}
                                  <i className="fas fa-external-link"></i>
                                </p>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end-section 2  */}
        {/* section 03  */}
        <section className="hilight-section03 layout03-2 pb-5s">
          <div className="container">
            <div className="row ">
              {/* header  */}
              <div className="col-12 col-6-1 mt-5 mb-4" align="left">
                <p className="text-rc_ex ">Related collection</p>
              </div>
              {/* end-header  */}
              <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                  <CardBuy
                    img="../assets/rsu-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.png"
                    detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                    time="5 days left"
                    fav="12"
                    coin="12"
                    link="/Explore-collection/detail-music"
                    button="Buy"
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <CardBuy
                    img="../assets/rsu-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.png"
                    detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                    time="5 days left"
                    fav="12"
                    coin="12"
                    link="/Explore-collection/detail-music"
                    button="Buy"
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <CardBuy
                    img="../assets/rsu-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.png"
                    detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                    time="5 days left"
                    fav="12"
                    coin="12"
                    link="/Explore-collection/detail-music"
                    button="Buy"
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <CardBuy
                    img="../assets/rsu-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.png"
                    detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                    time="5 days left"
                    fav="12"
                    coin="12"
                    link="#"
                    button="Buy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end-section 03  */}
      </div>
    </>
  );
};

export default ExploreCollectionDetailmusic;
ExploreCollectionDetailmusic.layout = Mainlayout;
