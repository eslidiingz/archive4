import { useEffect, useState } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Modal from 'react-bootstrap/Modal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
// import ModalBody from 'react-bootstrap/ModalBody'
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalFooter from 'react-bootstrap/ModalFooter'
// import ModalTitle from 'react-bootstrap/ModalTitle'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container, Row, Col, Nav } from "react-bootstrap";
import CardBuy from "../../components/card/CardBuy";
import Accept from "../../components/modal/Accept";





const ExploreCollectionDetailsell = () => {
    const [showAcceptModal, setAcceptModal] = useState(false);

    const handleCloseAcceptModal = () => {
        setAcceptModal(false);
    };
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
                                    <Link href="/"><a className="text-navation_mr">Home</a></Link> &gt;
                                    <Link href="/Explore-collection/item"><a className="text-white text-navation_mr">Collections</a></Link> &gt;
                                    <Link href="/Explore-collection"><a className="text-white text-navation_mr">Explore</a></Link></p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end-section 1  */}
                {/* section 2  */}
                <section className="bg-blue">
                    <div className="container">
                        <div className="row pb-5 pt-3">
                            <div className="col-lg-6 mt-4 mb-5">
                                <div>
                                    <div className="img-player2">
                                        <img src="/assets/rsu-image/music/demo.png" />
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
                    <Tabs defaultActiveKey="sell" id="main-tab" className="mb-3 px-0">
                        <Tab eventKey="sell" title="sell" >
                                <div className="text-center pt-4">
                                    <p className="text-detail_ex">Minimum bid -- </p>
                                    <div className="text09-2 mt-4 mb-4">
                                        <img className="layout-profile02_ex" src="../assets/rsu-image/icons/coin.svg"/>&nbsp;<span className="text-detail02_ex">522</span><span className="text-detail_ex">&nbsp;( 233$ )</span></div>
                                    </div>
                                    <hr/>
                                <div className="row">
                                    <div className="col-xl-12">
                                    <p className="text-header-detail">Fees</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-detail-acc">Srvice Fee</p>
                                        <p className="text-detail-acc_link">2.5%</p>
                                    </div>
                                </div>
                                <div className="col-12 mb-2 pt-4">
                                    <button className="btn-hover color-1 w-full h-36">Buy Now</button>
                                </div>
                        </Tab>
                        <Tab eventKey="auction" title="auction">
                                <div className="text-center pt-4">
                                    <p className="text-detail_ex ">Minimum bid -- </p>
                                    <div className="text09-2 mt-4 mb-4">
                                        <img className="layout-profile02_ex" src="../assets/rsu-image/icons/coin.svg"/>&nbsp;<span className="text-detail02_ex">522</span><span className="text-detail_ex">&nbsp;( 233$ )</span></div>
                                    </div>
                                <div  className="d-flex justify-content-between">
                                    <p className="text-header-detail mb-3">Time</p>
                                    <p className="text-detail-acc_link">12:00 AM</p>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-xl-12">
                                    <p className="text-header-detail">Fees</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-detail-acc">Srvice Fee</p>
                                        <p className="text-detail-acc_link">2.5%</p>
                                    </div>
                                </div>
                                <div className="col-12 mb-2 pt-4">
                                    <button className="btn-hover color-1 w-full h-36">Buy Now</button>
                                </div>
                        </Tab>
                       
                    </Tabs>
            </Row>
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="layout-des_sell-detailpage">
                                    <p className="text-tittle-des"><i className="fas fa-align-left mx-2"></i> Description</p>
                                </div>
                                <div className="layout-des_sub-sell">
                                    <div className="d-flex pb-lg-2 pt-lg-3">
                                        <p className="textprofile-des">Created by</p>
                                        <Link href={""}>
                                            <p className="textprofile-des_link">Xeroca</p>
                                        </Link>
                                        <img className="i-purple" alt="" width={20} src="/assets/rsu-image/icons/verify-black.svg" />
                                    </div>
                                    <p className="text-deatile-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="layout-des_sell-detailpage">
                                    <p className="text-tittle-des"><i class="fas fa-list-alt mx-2"></i>Deatil</p>
                                </div>
                                <div className="layout-des_table-sell pb-lg-3">
                                <tbody>
                                    <tr>
                                        <td style={{width: "100%"}}><p className="text-detail-acc" >Cpntract Address</p></td>
                                        <td><p className="text-detail-acc_link" align="right">Oxc1ad.....248</p></td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "100%"}}><p className="text-detail-acc">Token ID</p></td>
                                        <td><p className="text-detail-acc_link" align="right">5499</p></td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "100%"}}><p className="text-detail-acc" >Token Standard</p></td>
                                        <td><p className="text-detail-acc" align="right">ERC-721</p></td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "100%"}}><p className="text-detail-acc" >BlockChain</p></td>
                                        <td><p className="text-detail-acc" align="right">Ehereum</p></td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "100%"}}><p className="text-detail-acc" >Creator Fees</p></td>
                                        <td><p className="text-detail-acc" align="right">5%</p></td>
                                    </tr>
                                </tbody> 
                                </div>
                            </div>

                        </div>       
                    </div>
                </section>
                {/* end-section 2  */}

                <Accept
                    onClose={handleCloseAcceptModal}
                    show={showAcceptModal}
                />
            </div>
        </>
    );
};

export default ExploreCollectionDetailsell;
ExploreCollectionDetailsell.layout = Mainlayout;
