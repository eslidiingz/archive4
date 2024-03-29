import { useEffect, useState } from "react";
import Link from "next/link";
import Mainlayout from "../../../../components/layouts/Mainlayout";
import React from "react";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
// import ModalBody from 'react-bootstrap/ModalBody'
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalFooter from 'react-bootstrap/ModalFooter'
// import ModalTitle from 'react-bootstrap/ModalTitle'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container, Row, Col, Nav, Form, Spinner } from "react-bootstrap";
import CardBuy from "../../../../components/card/CardBuy";
import Accept from "../../../../components/modal/Accept";
import { useRouter } from "next/router";
import { smartContact } from "../../../../utils/providers/connector";
import { GetShortAddress } from "../../../../utils/ethers/connect-metamask";
import Config from "../../../../configs/config";
import { BigNumber, ethers, utils } from "ethers";
import { shortWallet } from "../../../../utils/misc";

const ExploreCollectionDetailsell = () => {
  const [showAcceptModal, setAcceptModal] = useState(false);

  const handleCloseAcceptModal = () => {
    setAcceptModal(false);
  };
  const router = useRouter();
  const { address, tokenId } = router.query;
  const [value, setValue] = React.useState(0);
  const [tokenInfo, setTokenInfo] = useState({
    symbol: null,
    name: null,
    address: null,
  });
  const [startPrice, setStartPrice] = useState(null);
  const [terminatePrice, setTerminatePrice] = useState(0);
  const [expiration, setExpiration] = useState(null);
  const [isAuction, setIsAuction] = useState(0);
  const [isApprove, setIsApprove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const [metadata, setMetadata] = useState({
    image: null,
    description: null,
  });
  useEffect(() => {
    initialize();
  }, []);
  const initialize = async () => {
    setIsLoading(true);
    await isApproveForMarketplace();
    setIsLoading(false);
  };
  // const handleChange = (event, newValue) => {
  //     setValue(newValue);
  // };
  const onChangeTab = () => {
    setTokenInfo({ symbol: null, name: null, address: null });
    setStartPrice(0);
    // setTerminatePrice(0);
    // setExpiration(null);
    let inputsToken = document.getElementsByClassName("input-token-address");
    let inputPrice = document.getElementsByClassName("input-price");
    for (let i = 0; i < inputsToken.length; i++) inputsToken[i].value = "";
    for (let i = 0; i < inputPrice.length; i++) inputPrice[i].value = "";
  };

  const approveContract = async () => {
    const nftContract = smartContact(Config.ASSET_CA, Config.ASSET_ABI);
    let transaction = await nftContract.approve(Config.MARKETPLACE_CA, tokenId);
    let result = await transaction.wait();
    setIsApprove(transaction);
  };
  const getTokenInfo = async (tokenAddress) => {
    setTokenLoading(true);
    try {
      const erc20SmartContract = smartContact(tokenAddress, Config.ERC20_ABI);
      const symbol = await erc20SmartContract.symbol();
      const name = await erc20SmartContract.name();
      setTokenInfo({
        symbol: symbol,
        name: name,
        address: tokenAddress,
      });
    } catch (e) {
      console.log(e);
      setTokenInfo({
        symbol: null,
        name: null,
        address: null,
      });
    }
    setTokenLoading(false);
  };
  const createOrder = async (type = 0) => {
    // ** type: (0 market) (1 auction)
    // only auction process
    if (!startPrice || !tokenInfo.symbol) {
      alert("INVALID INPUT");
      return;
    }

    let startPriceInWei = BigNumber.from(
      utils.parseEther(startPrice)
    ).toString();
    let terminatePriceInEth =
      type == 1
        ? BigNumber.from(utils.parseEther(terminatePrice)).toString()
        : 0;
    if (type >= 2) return;
    const marketplaceContract = await smartContact(
      Config.MARKETPLACE_CA,
      Config.MARKETPLACE_ABI
    );
    let _expiration = expiration ? expiration : 0;
    console.log(
      address,
      tokenInfo.address,
      parseInt(tokenId),
      startPriceInWei,
      _expiration,
      terminatePriceInEth,
      type
    );
    try {
      let transaction = await marketplaceContract.createOrder(
        address,
        tokenInfo.address,
        parseInt(tokenId),
        startPriceInWei,
        _expiration,
        terminatePriceInEth,
        type
      );
      let result = await transaction.wait();
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  const isApproveForMarketplace = async () => {
    setImageLoading(true);
    const nftContract = await smartContact(Config.ASSET_CA, Config.ASSET_ABI);
    const tokenURI = await nftContract.tokenURI(tokenId);
    console.log(tokenURI);
    const rawMetadata = await fetch(tokenURI);
    const metadata = await rawMetadata.json();
    setMetadata(metadata);
    let contractThatApproved = await nftContract.getApproved(tokenId);
    if (contractThatApproved == Config.MARKETPLACE_CA) {
      setIsApprove(true);
    }
    setImageLoading(false);
  };
  return (
    <>
      <div>
        {/* section 1  */}
        <section className="hilight-sections">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 hilight-content2-3 mt-4">
                <p className="text-tittle_ex">Create Sell/Auction</p>
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
              <div className="col-lg-6 mt-4 mb-5" align="center">
                <div>
                  <div className="img-player2">
                    {isImageLoading ? (
                      <Spinner
                        align="center"
                        variant="light"
                        animation="border"
                        size="sm"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <img src={metadata.image} />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4 mb-6">
                <div className="layout-sell-detailpage">
                  <p className="text-tittle-des"> List item for sale</p>
                </div>
                <div className="layout-des_sub-detailpage">
                  <div className="col-lg-12">
                    <p className="text-header-detail mb-lg-3">Type</p>
                  </div>
                  <hr className="mb-lg-3" />
                  <Row className="exp-tab px-3">
                    <Tabs
                      defaultActiveKey="sell"
                      id="main-tab"
                      className="mb-3 px-0"
                      onSelect={(e) => onChangeTab(e)}
                    >
                      <Tab eventKey="sell" title="sell">
                        <Form>
                          <Form.Group className="mb-3" controlId="tokenAddress">
                            <Form.Label className="text-header-detail mb-2">
                              Buy/Sell with token address
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="input-search-set height-54 input-token-address"
                              placeholder="Token Address"
                              onChange={(addr) => {
                                console.log("Address : ", addr.target.value);
                                getTokenInfo(addr.target.value);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="tokenSymbol">
                            <Form.Label className="text-header-detail mb-2">
                              Token symbol{" "}
                              {tokenLoading ? (
                                <Spinner
                                  align="center"
                                  variant="light"
                                  animation="border"
                                  size="sm"
                                />
                              ) : (
                                ""
                              )}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="input-search-set height-54"
                              placeholder="Token Symbol"
                              value={
                                tokenInfo.symbol ? tokenInfo.symbol : "NONE"
                              }
                              readOnly="true"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="startPrice">
                            <Form.Label className="text-header-detail mb-2">
                              Price
                            </Form.Label>
                            <Form.Control
                              type="number"
                              className="input-search-set height-54 input-price"
                              placeholder="Start Price"
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value < 0) {
                                  e.target.value = 0;
                                  // setStartPrice(0);
                                } else {
                                  setStartPrice(value);
                                }
                              }}
                            />
                          </Form.Group>
                        </Form>
                        {/* <div className="text-center pt-4">
                                                        <p className="text-detail_ex">Minimum bid -- </p>
                                                        <div className="text09-2 mt-4 mb-4">
                                                            <img className="layout-profile02_ex" src="../assets/rsu-image/icons/coin.svg"/>&nbsp;<span className="text-detail02_ex">522</span><span className="text-detail_ex">&nbsp;( 233$ )</span>
                                                        </div>
                                                    </div> */}
                        {/* <hr/> */}
                        {/* <div className="row">
                                                        <div className="col-xl-12">
                                                        <p className="text-header-detail">Fees</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="text-detail-acc">Srvice Fee</p>
                                                            <p className="text-detail-acc_link">2.5%</p>
                                                        </div>
                                                    </div> */}
                        <div className="col-12 mb-2 pt-4">
                          <button
                            className="btn-hover color-1 w-full h-36"
                            onClick={() => {
                              isApprove ? createOrder(0) : approveContract();
                            }}
                          >
                            {" "}
                            {isLoading ? (
                              <Spinner
                                variant="light"
                                animation="border"
                                size="sm"
                              />
                            ) : (
                              ""
                            )}{" "}
                            {isApprove ? "List sell" : "Approve"}
                          </button>
                        </div>
                      </Tab>
                      <Tab eventKey="auction" title="auction">
                        <Form>
                          <Form.Group className="mb-3" controlId="tokenAddress">
                            <Form.Label className="text-header-detail mb-2">
                              Bidding with token address
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="input-search-set height-54 input-token-address"
                              placeholder="Token Address"
                              onChange={(addr) => {
                                console.log("Address : ", addr.target.value);
                                getTokenInfo(addr.target.value);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="tokenSymbol">
                            <Form.Label className="text-header-detail mb-2">
                              Token symbol{" "}
                              {tokenLoading ? (
                                <Spinner
                                  align="center"
                                  variant="light"
                                  animation="border"
                                  size="sm"
                                />
                              ) : (
                                ""
                              )}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="input-search-set height-54"
                              placeholder="Token Symbol"
                              value={
                                tokenInfo.symbol ? tokenInfo.symbol : "NONE"
                              }
                              readOnly="true"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="startPrice">
                            <Form.Label className="text-header-detail mb-2">
                              Start Price
                            </Form.Label>
                            <Form.Control
                              type="number"
                              className="input-search-set height-54 input-price"
                              placeholder="Start Price"
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value < 0) {
                                  e.target.value = 0;
                                  // setStartPrice(0);
                                } else {
                                  setStartPrice(value);
                                }
                              }}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="terminatePrice"
                          >
                            <Form.Label className="text-header-detail mb-2">
                              Terminate price (optional)
                            </Form.Label>
                            <Form.Control
                              type="number"
                              className="input-search-set height-54"
                              placeholder="Terminate Price"
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value < 0 && value > startPrice) {
                                  e.target.value = 0;
                                  setTerminatePrice(0);
                                } else {
                                  setTerminatePrice(value);
                                }
                              }}
                              readOnly={!startPrice}
                            />
                          </Form.Group>
                          <input
                            type="datetime-local"
                            onChange={(e) => {
                              setExpiration(
                                Math.floor(
                                  new Date(e.target.value).getTime() / 1000
                                )
                              );
                            }}
                          />
                        </Form>
                        {/* <div className="text-center pt-4">
                                                        <p className="text-detail_ex ">Start price {} </p>
                                                        <div className="text09-2 mt-4 mb-4">
                                                            <img className="layout-profile02_ex" src="../assets/rsu-image/icons/coin.svg"/>&nbsp;<span className="text-detail02_ex">522</span><span className="text-detail_ex">&nbsp;( 233$ )</span></div>
                                                        </div>
                                                    <div  className="d-flex justify-content-between">
                                                        <p className="text-header-detail mb-3">Time</p>
                                                        <p className="text-detail-acc_link">12:00 AM</p>
                                                    </div> */}
                        <hr />
                        {/* <div className="row">
                                                        <div className="col-xl-12">
                                                        <p className="text-header-detail">Fees</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="text-detail-acc">Srvice Fee</p>
                                                            <p className="text-detail-acc_link">2.5%</p>
                                                        </div>
                                                    </div> */}
                        <div className="col-12 mb-2 pt-4">
                          <button
                            className="btn-hover color-1 w-full h-36"
                            onClick={() => {
                              isApprove ? createOrder(1) : approveContract();
                            }}
                          >
                            {isApprove ? "List bidding" : "Approve"}
                          </button>
                        </div>
                      </Tab>
                    </Tabs>
                  </Row>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="layout-des_sell-detailpage">
                  <p className="text-tittle-des">
                    <i className="fas fa-align-left mx-2"></i> Description
                  </p>
                </div>
                <div className="layout-des_sub-sell">
                  <div className="d-flex pb-lg-2 pt-lg-3">
                    <p className="textprofile-des">Created by</p>
                    <Link href={""}>
                      <p className="textprofile-des_link">Xeroca</p>
                    </Link>
                    <img
                      className="i-purple"
                      alt=""
                      width={20}
                      src="/assets/rsu-image/icons/verify-black.svg"
                    />
                  </div>
                  <p className="text-deatile-des">
                    {metadata.description ? (
                      metadata.description
                    ) : (
                      <Spinner
                        align="center"
                        variant="light"
                        animation="border"
                        size="lg"
                      />
                    )}{" "}
                  </p>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="layout-des_sell-detailpage">
                  <p className="text-tittle-des">
                    <i className="fas fa-list-alt mx-2"></i>Deatil
                  </p>
                </div>
                <div className="layout-des_table-sell pb-lg-3">
                  <tbody>
                    <tr>
                      <td style={{ width: "100%" }}>
                        <p className="text-detail-acc">Contract Address</p>
                      </td>
                      <td>
                        <p className="text-detail-acc_link" align="right">
                          {shortWallet(address)}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "100%" }}>
                        <p className="text-detail-acc">Token ID</p>
                      </td>
                      <td>
                        <p className="text-detail-acc_link" align="right">
                          {tokenId}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "100%" }}>
                        <p className="text-detail-acc">Token Standard</p>
                      </td>
                      <td>
                        <p className="text-detail-acc" align="right">
                          ERC-721
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "100%" }}>
                        <p className="text-detail-acc">BlockChain</p>
                      </td>
                      <td>
                        <p className="text-detail-acc" align="right">
                          BSC
                        </p>
                      </td>
                    </tr>
                    {/* <tr>
                                        <td style={{width: "100%"}}><p className="text-detail-acc" >Creator Fees</p></td>
                                        <td><p className="text-detail-acc" align="right">5%</p></td>
                                    </tr> */}
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end-section 2  */}

        <Accept onClose={handleCloseAcceptModal} show={showAcceptModal} />
      </div>
    </>
  );
};

export default ExploreCollectionDetailsell;
ExploreCollectionDetailsell.layout = Mainlayout;
