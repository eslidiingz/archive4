import { useState } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Modal from 'react-bootstrap/Modal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Container, Row, Col, Nav} from "react-bootstrap";
import CardBuy from "../../components/card/CardBuy";
import DeatilBuy from "../../components/form/DeatilBuy";
import { Table,Tabs, Tab} from "react-bootstrap";
import Search from "../../components/form/search";
import Select from "../../components/form/select";





const ExploreCollectionDetailmusic = () => {
    const [isOpen, setIsOpen] = React.useState(false);
const showModal = () => {setIsOpen(true);
};
const hideModal = () => {
setIsOpen(false);
 };
 const [isBuynow, setBuynow] = useState(false);
 const Buynow = () => {
   setBuynow(!isBuynow);
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
            <div className="col-lg-7 mt-4 mb-5">
                <div>
                    <div className="img-player2">
                     <img src="/assets/rsu-image/music/demo.png"/>
                    </div>
                </div>
                
            </div>

            <div className="col-lg-5 mt-4 mb-6">
                <p className="text-tittle_detail">Dipper</p>
                    <div className="row">
                    <div className="col-sm-12">
                    <div className="row box">
                        <div className="col-12">
                            <div className="d-flex gap-2 align-items-center " >
                                <div className="img-user" >
                                    <img src="/assets/rsu-image/user/Ellipse.svg" />
                                </div>
                                <div>
                                    <p className="text_profile_ex">Owned by</p>
                                    <p className="text_profile_ex02">Xeroca</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                <div className="layout-profile_ex">
                    <p className="text-detail_ex">Sale ends 04 March 2022 at 3.05am +7</p>
                    <p className="text-detail-time_ex">11h : 23m : 45s</p>
                    <hr className="text-detail-hr_ex"/>
                    <p className="text-detail_ex">Minimum bid -- </p>
                    <p className="text09-2 mt-4 mb-4">
                    <img className="layout-profile02_ex" src="../assets/rsu-image/icons/coin.svg"/>&nbsp;<span className="text-detail02_ex">522</span><span className="text-detail_ex">&nbsp;( 233$ )</span></p>
                
                    <div className="row" >
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0 mb-2">
                            <button className="btn2 w-full h-36" onClick={showModal}>Make Offer</button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2">
                            <button className="btn-hover color-1 w-full h-36" onClick={showModal}>Buy Now</button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0 mb-2">
                            <button className="btnclose w-full h-36">Close Bid</button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2">
                            <button className="btn-hover color-1 w-full h-36">Sell</button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0 mb-2">
                            <button className="btnclose w-full h-36">Cancle Sell</button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2">
                            <button className="btn-hover color-1 w-full h-36"><i className="far fa-circle-notch" style={{transform: "rotate(90deg)"}}></i> Bid</button>
                        </div>
                    </div>
                    <Modal show={isOpen} onHide={hideModal} size="lg">
                        <DeatilBuy/>
                    </Modal>
                </div>
                <p className="text-detail_ex mt-4">Latest Bids</p>
                <div className="row layout-profile-lates_ex">
                    <div className="col-sm-12 mb-2">
                        <div className="row box layout-profile-lates02_ex">
                            <div className="col-2 col-1s">
                                <img src="../assets/rsu-image/user/Ellipse.svg" className="img01-1"/>
                            </div>
                            <div className="col-3 col-3s">
                                <p className="text_profile_ex">Papaya</p>
                                <p className="text_profile_ex02">0.05 ETH</p>
                            </div>
                            <div className="col-6 col-3s" align="right">
                                <button className="text-detailpage-cancle">Cancel Bid</button>
                                <p className="text-detail03_ex">12 min ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 mb-2">
                        <div className="row box layout-profile-lates02_ex">
                            <div className="col-2 col-1s">
                                <img src="../assets/rsu-image/user/Ellipse.svg" className="img01-1"/>
                            </div>
                            <div className="col-3 col-3s">
                                <p className="text_profile_ex">Papaya</p>
                                <p className="text_profile_ex02">0.05 ETH</p>
                            </div>
                            <div className="col-6 col-3s" align="right">
                                <button className="text-detailpage-cancle">Cancel Bid</button>
                                <p className="text-detail03_ex">12 min ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 mb-2">
                        <div className="row box layout-profile-lates02_ex">
                            <div className="col-2 col-1s">
                                <img src="../assets/rsu-image/user/Ellipse.svg" className="img01-1"/>
                            </div>
                            <div className="col-3 col-3s">
                                <p className="text_profile_ex">Papaya</p>
                                <p className="text_profile_ex02">0.05 ETH</p>
                            </div>
                            <div className="col-6 col-3s" align="right">
                                <button className="text-detailpage-cancle">Cancel Bid</button>
                                <p className="text-detail03_ex">12 min ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-4">
              <div className="layout-des-detailpage">
                  <p className="text-tittle-des"><i className="fas fa-align-left mx-2"></i> Description</p>
              </div>
              <div className="layout-des_sub-detailpage">
                <div className="d-flex pb-lg-2 pt-lg-3">
                    <p className="textprofile-des">Created by</p>
                    <Link href={""}>
                        <p className="textprofile-des_link">Xeroca</p>
                    </Link>
                    <img className="i-purple" alt="" width={20} src="/assets/rsu-image/icons/verify-black.svg" />
                </div>
                  <p className="text-deatile-des">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="layout-des-detailpage">
                  <p className="text-tittle-des"><i className="fas fa-list-ul mx-2"></i> Offer</p>
              </div>
              <div className="layout-des_sub-detailpage">
              <div className="col-12 exp-table">
                  <Table borderless responsive hover>
                    <thead>
                      <tr className="bd-bottom" >
                        <th className="py-3" ><p className="mb-0" >Price</p></th>
                        <th className="py-3" ><p className="mb-0" >USD Price</p></th>
                        <th className="py-3" ><p className="mb-0" >Floor Difference</p></th>
                        <th className="py-3" ><p className="mb-0" >Expirtion</p></th>
                        <th className="py-3" ><p className="mb-0" >From</p></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 " >
                                <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
                                <div>
                                <p className="mb-0">500</p>
                                </div>
                            </div>
                        </td>

                        <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0">$ 25,000.77</p>
                            </div>
                        </td>
                        <td className="pt-4 pb-3">
                            <p className="mb-0">42% below</p>
                        </td>
                        <td className="pt-4 pb-3">
                            <p className="mb-0">about 10 hours</p>
                        </td>
                        <td className="pt-4 pb-3">
                            <Link href={""}>
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0 ci-purple textprofile-table textprofile-des_link">Xeroca</p>
                            </div>
                            </Link>
                        </td>
                      </tr>
                      <tr>
                      <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 " >
                                <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
                                <div>
                                <p className="mb-0">500</p>
                                </div>
                            </div>
                        </td>

                        <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0">$ 25,000.77</p>
                            </div>
                        </td>
                        <td className="pt-4 pb-3">
                            <p className="mb-0">42% below</p>
                        </td>
                        <td className="pt-4 pb-3">
                            <p className="mb-0">about 10 hours</p>
                        </td>
                        <td className="pt-4 pb-3">
                            <Link href={""}>
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0 ci-purple textprofile-table textprofile-des_link">Xeroca</p>
                            </div>
                            </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="col-xl-3">
              <div className="layout_main-acc">
                <p className="text-tittle-des"><i class="fas fa-list-alt mx-2"></i>Deatil</p>
              </div>
              <div className="layout-des_table-detailpage pb-lg-3">
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
            <div className="col-xl-9">
                <div className="layout_main-acc">
                  <p className="text-tittle-des">Item Activity</p>
              </div>
              <div className="layout-des_sub-detailpage">
                <Select selected="Filter" />
                <div className="d-flex mt-lg-3">
                    <button className={`btn btn-filter active`} onClick={Buynow}><i className="fal fa-times mgr-8 c-pointer"></i> Sales</button>
                    <button className={`btn btn-filter active mx-lg-3`} onClick={Buynow}><i className="fal fa-times mgr-8 c-pointer"></i> Buy now</button>
                </div>
                <div className="col-12 mt-lg-3 exp-table">
                  <Table borderless responsive hover>
                    <thead>
                      <tr className="bd-bottom" >
                        <th className="py-3" ><p className="mb-0" >Eent</p></th>
                        <th className="py-3" ><p className="mb-0" >Price</p></th>
                        <th className="py-3" ><p className="mb-0" >From</p></th>
                        <th className="py-3" ><p className="mb-0" >To</p></th>
                        <th className="py-3" ><p className="mb-0" >Date</p></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 " >
                                <i class="fas fa-shopping-cart"></i>
                                <div>
                                    <p className="mb-0">Sale</p>
                                </div>
                            </div>
                        </td>

                        <td className="pt-4 pb-3">
                        <div className="d-flex align-items-start gap-2 " >
                                <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
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
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0 ci-purple textprofile-des_link">3 day ago <i class="fas fa-external-link"></i></p>
                            </div>
                            </Link>
                        </td>
                      </tr>
                      <tr>
                      <td className="pt-4 pb-3">
                            <div className="d-flex align-items-start gap-2 " >
                                <i class="fas fa-exchange-alt"></i>
                                <div>
                                    <p className="mb-0">Transfer</p>
                                </div>
                            </div>
                        </td>

                        <td className="pt-4 pb-3">
                        <div className="d-flex align-items-start gap-2 " >
                                <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
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
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0 ci-purple textprofile-des_link">3 day ago <i class="fas fa-external-link"></i></p>
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
                     button="Buy"/>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <CardBuy
                     img="../assets/rsu-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     fav="12"
                     coin="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <CardBuy
                     img="../assets/rsu-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     fav="12"
                     coin="12"
                     link="/Explore-collection/detail-music"
                     button="Buy"/>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <CardBuy
                     img="../assets/rsu-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.png" 
                     detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                     time="5 days left" 
                     fav="12"
                     coin="12"
                     link="#"
                     button="Buy"/>
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
