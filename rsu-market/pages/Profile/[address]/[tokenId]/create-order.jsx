import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../../../../components/layouts/Mainlayout";
import React from "react";
import Tab from "react-bootstrap/Tab";
import { Nav } from "react-bootstrap";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import { useState } from "react";
import { smartContact, web3Provider } from "../../../../utils/providers/connector";
import Config from "../../../../configs/config";
import { ethers } from "ethers";

const CreateOrder = () => {
  const router = useRouter();
  const { address, tokenId } = router.query;
  const [tokenInfo, setTokenInfo] = useState({symbol: null, name: null, address: null});
  const [startPrice, setStartPrice] = useState(null);
  const [terminatePrice, setTerminatePrice] = useState(0);
  const [expiration, setExpiration] = useState(null);
  const [isAuction, setIsAuction] = useState(0);
  const [isApprove, setIsApprove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getTokenInfo = async (tokenAddress) => {
    try {
      const erc20SmartContract = await smartContact(tokenAddress, Config.ERC20_ABI);
      const symbol = await erc20SmartContract.symbol();
      const name = await erc20SmartContract.name();
      setTokenInfo({
        symbol : symbol,
        name: name,
        address: tokenAddress
      });
    } catch (e) {
      setTokenInfo({
        symbol : null,
        name: null,
        address: null
      });
    }
  }
  const createOrder = async (type = 0) => {
    // ** type: (0 market) (1 auction)
    // only auction process
    if(!startPrice || !tokenInfo.symbol){
      alert("INVALID INPUT");
      return;
    }
    let startPriceInEth= ethers.utils.formatUnits(startPrice, "ether");
    console.log(startPriceInEth);
    console.log(startPrice, startPriceInEth);
    let terminatePriceInEth = (type == 1) ? ethers.utils.formatUnits(terminatePrice, "ether") : 0;
    if(type >= 2) return;
    const marketplaceContract = await smartContact(Config.MARKETPLACE_CA, Config.MARKETPLACE_ABI);
    console.log(address, tokenInfo.address, parseInt(tokenId), parseInt(startPriceInEth), expiration, parseInt(terminatePriceInEth), type);
    try {
      let transaction = await marketplaceContract.createOrder(address, tokenInfo.address, parseInt(tokenId), parseInt(startPriceInEth), expiration, parseInt(terminatePriceInEth), type);
      let result = await transaction.wait();
    } catch (e) {
      console.log(e);
    }
    
  }
  const approveContract = async () => {
    const nftContract = await smartContact(Config.ASSET_CA, Config.ASSET_ABI);
    let transaction = await nftContract.approve(Config.MARKETPLACE_CA, tokenId);
    let result = await transaction.wait();
    setIsApprove(transaction);
  }
  const initialize = async () => {
    setIsLoading(true);
    await isApproveForMarketplace();
    setIsLoading(false);
  }
  const isApproveForMarketplace = async () => {
    const nftContract = await smartContact(Config.ASSET_CA, Config.ASSET_ABI);
    let contractThatApproved = await nftContract.getApproved(tokenId);
    if(contractThatApproved == Config.MARKETPLACE_CA){
      setIsApprove(true);
    }
  }
  useEffect(() => {
    initialize();
  }, []);
  return (
    <>
      <section className="section-gradient">
        <div className="container pd-top-bottom-section">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <h1 className="ci-white">Profile</h1>
            </div>
            <div className="col-6 text-end">
              <p className="ci-white mb-0">
                Home <span> {">"} </span> <span> Collections </span>{" "}
                <span> {">"} </span> <span>Explore</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue test2">
        <div className="container">
          <Row className=" px-3">
            <Col md={12}>
              <h2 className="text-white mt-3">Create Order</h2>
              
              <div className="box-create text-white text-start mb-4">
                {/* <Form.Group
                  controlId="formFile"
                  className="mb-3 custom-file-upload img-profile"
                >
                  <Form.Label>
                    <p>Choose file </p>
                    <i className="fas fa-plus"></i>
                  </Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <p className="ci-purple">*Max file sizeis 20mb</p> */}
                <Form>
                  <Form.Group className="mb-3" controlId="contractAddress">
                    <Form.Label>Contract Address</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-search-set height-54"
                      placeholder="contractAddress"
                      value={address}
                      readOnly="true"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="tokenId">
                    <Form.Label>Token ID</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-search-set height-54"
                      placeholder="tokenId"
                      value={tokenId}
                      readOnly="true"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="tokenAddress">
                    <Form.Label>Buy/Sell with token address</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-search-set height-54"
                      placeholder="Token Address"
                      onChange={(addr) => {console.log(addr.target.value); getTokenInfo(addr.target.value)}}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="tokenSymbol">
                    <Form.Label>Token symbol</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-search-set height-54"
                      placeholder="Token Symbol"
                      value={tokenInfo.symbol ? tokenInfo.symbol : "NONE"}
                      readOnly="true"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="startPrice">
                    <Form.Label>Start price</Form.Label>
                    <Form.Control
                      type="number"
                      className="input-search-set height-54"
                      placeholder="Start Price"
                      onChange={(e) => {
                        let value = e.target.value;
                        if(value < 0){
                          e.target.value = 0;
                          // setStartPrice(0);
                        } else {
                          setStartPrice(value);
                        }
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="terminatePrice">
                    <Form.Label>Terminate price</Form.Label>
                    <Form.Control
                      type="number"
                      className="input-search-set height-54"
                      placeholder="Terminate Price"
                      onChange={(e) => {
                        let value = e.target.value;
                        if(value < 0 && value > startPrice){
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
                    onChange={e => {setExpiration(Math.floor((new Date(e.target.value).getTime()) / 1000))}}
                  />
                  <h5>Is Auction</h5>
                  <input 
                    type="checkbox"
                    onChange={(e) => {
                      if(e.target.checked){
                        setIsAuction(1);
                      } else {
                        setIsAuction(0);
                      }
                    }}

                  />
                  {/* <Form.Group className="mb-3" controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control as="textarea" rows={3} className="input-search-set" />
                  </Form.Group> */}
                </Form>
                <div className="d-flex justify-content-end mt-5">
                  <Link  href="/Profile">
                    <button className="btn btn-secondary wmax-120 me-2">
                      Cancel
                    </button>
                  </Link>
                  {isApprove ? (
                    <button className="btn btn03 btn-hover color-1 wmax-120" onClick={() => createOrder(0)}>
                      Submit
                    </button>
                  ): (
                    <button className="btn btn03 btn-hover color-1 wmax-120" onClick={() => approveContract()}>
                      Approve
                    </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default CreateOrder;
CreateOrder.layout = Mainlayout;
