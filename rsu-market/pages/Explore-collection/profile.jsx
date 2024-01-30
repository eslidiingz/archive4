import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Slider from "react-slick";
// import Tab from 'react-bootstrap/Tab'
// import { Tabs, Tab } from "react-bootstrap";
import HeaderExploreProfile from "../../components/layouts/HeaderExploreProfile";
import { Table,Tabs, Tab} from "react-bootstrap";
// import HeaderExplore from "../../components/layouts/HeaderExplore";
import Filter from "../../components/layouts/Filter";
import Search from "../../components/form/search";
import Select from "../../components/form/select";
import CardBuy from "../../components/card/CardBuy";
import Dropdown from 'react-bootstrap/Dropdown'


const ExploreCollectionProfile = () => {
    const labels = ['3/12', '3/13', '3/14', '3/15','3/16', '3/17', '3/18', '3/19', '3/20', '3/21', '3/22','3/23', '3/24', '3/25', '3/26', '3/27', '3/28', '3/29'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [20, 30, 15, 40, 30, 25, 40, 5, 35, 60, 40, 21, 18, 24, 75, 45, 85, 100],
        borderColor: 'rgb(124, 75, 247, 100)',
        backgroundColor: 'rgb(124, 75, 247, 100)',
      }
    ],
  };
  

  return (
    <>
    <div>
        <HeaderExploreProfile
        tittle="dbai&nbsp;"
        codeDiamond="1f6s4f6wf4ew...459"
        LinkTwitter="#"
        nameTwitter="&nbsp;&nbsp;dbai"
        LinkIg="#"
        nameIg="&nbsp;&nbsp;dbai"
        description="Dour Darcels are a collection of 10,000 moody frens from Darcel Disappoints. All are individual and unique – just like frens IRL
        "
        descriptionDate="Joined December 2021"
        imgProfile="../assets/rsu-image/user/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting 1.png" />
  

<section className="bg-blue">
      <div className="container d-flex flex-column flex-lg-row">
        <div className="w-300-100 py-4">
          <Filter/>
        </div>
        <div className="col bd-left exp-tab" >
          <div>
          <Tabs defaultActiveKey="Collected" id="main-tab" className="mb-3">
            <Tab eventKey="Collected" title="Collected (24)">
              <div className="row ps-lg-3">
                <div className="col exp-sub-tab my-3">
                  <div>
                    <div className="row">
                      <div className="col-12 col-lg-6 mb-2 mb-lg-0" >
                        <Search/>
                      </div>
                      <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                        <Select selected="Single Items" />
                      </div>
                      <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                        <Select selected="Price" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png"  
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                          price="Price" 
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          href="#"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png" 
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                          price="Price" 
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          href="#"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png"  
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                          price="Price" 
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          href="#"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png"  
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                          price="Price" 
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          href="#"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png"  
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                          price="Price" 
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          href="#"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab eventKey="Items" title="Items">
                <div className="row ps-lg-3">
                    <div className="col exp-sub-tab my-3">
                    <div>
                        <div className="row">
                        <div className="col-12 col-lg-6 mb-2 mb-lg-0" >
                            <Search/>
                        </div>
                        <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                            <Select selected="Single Items" />
                        </div>
                        <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                            <Select selected="Price" />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                            <CardBuy
                            img="/assets/rsu-image/music/music-demo.png"  
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                            price="Price" 
                            time="5 days left" 
                            fav="12"
                            coin="12"
                            href="#"
                            button="Buy"
                            link="/Explore-collection/detail-music"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                            <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                            price="Price" 
                            time="5 days left" 
                            fav="12"
                            coin="12"
                            href="#"
                            button="Buy"
                            link="/Explore-collection/detail-music"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                            <CardBuy
                            img="/assets/rsu-image/music/music-demo.png"  
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                            price="Price" 
                            time="5 days left" 
                            fav="12"
                            coin="12"
                            href="#"
                            button="Buy"
                            link="/Explore-collection/detail-music"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Favorite (0)" title="Favorite (0)">
              <div className="row ps-lg-3 my-3">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-2 mb-lg-0" >
                        <Search/>
                    </div>
                    <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                        <Select selected="Single Items" />
                    </div>
                    <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                        <Select selected="Price" />
                    </div>
                </div>
                <div className="col-12">
                  <p className="text-detail-dav_ex">This user hasn&apos;t favorited any items yet</p>
                </div>
              </div>
              
            </Tab>
            <Tab eventKey="Activity " title="Activity ">
                    <div className="row ps-lg-3">
                    <div className="col-12 exp-table">
                    <Table borderless responsive hover>
                        <thead>
                        <tr className="bd-bottom" >
                            <th className="py-3 ps-3 " ><p className="mb-0" >Event type</p></th>
                            <th className="py-3" ><p className="mb-0" >Item</p></th>
                            <th className="py-3" ><p className="mb-0" >Price</p></th>
                            <th className="py-3" ><p className="mb-0" >Quantity</p></th>
                            <th className="py-3" ><p className="mb-0" >From</p></th>
                            <th className="py-3" ><p className="mb-0" >To</p></th>
                            <th className="py-3" ><p className="mb-0" >Time</p></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="pt-4 pb-3 ps-3"><p className="mb-0">Transfer</p></td>
                            <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start " >
                                <div className="exp-table-img">
                                <img alt="" src="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" />
                                </div>
                                <p className="mb-0 exp-table-textdot">to ensure consistent ids are generated between the</p>
                            </div>
                            </td>
                            <td className="pt-4 pb-3">
                                <div className="d-flex align-items-start gap-2 " >
                                <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
                                <div>
                                    <p className="mb-0">500</p>
                                    <div className="ci-grey f10" >(1,234.65)</div>
                                </div>
                                </div>
                            </td>
                            <td className="pt-4 pb-3"><p className="mb-0">1</p></td>
                            <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0 ci-purple exp-table-textdot">to ensure consistent ids are generated between the</p>
                                <img width={15} alt="" className="i-purple" src="/assets/rsu-image/icons/verify-black.svg" />
                            </div>
                            </td>
                            <td className="pt-4 pb-3">
                            <p className="mb-0 ci-purple ">7868SD78</p>
                            </td>
                            <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start c-pointer " >
                                <p className="mb-0 ci-purple">6 Hours ago</p>
                                <img width={15} alt="" className="i-purple" src="/assets/rsu-image/icons/report.svg" />
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 ps-3"><p className="mb-0">Transfer</p></td>
                            <td className="py-4">
                            <div className=" d-flex gap-2 align-items-start " >
                                <div className="exp-table-img">
                                <img alt="" src="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" />
                                </div>
                                <p className="mb-0 exp-table-textdot">to ensure consistent ids are generated between the</p>
                            </div>
                            </td>
                            <td className="py-4">
                                <div className="d-flex align-items-start gap-2 " >
                                <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
                                <div>
                                    <p className="mb-0">---</p>
                                </div>
                                </div>
                            </td>
                            <td className="py-4"><p className="mb-0">1</p></td>
                            <td className="py-4">
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0 ci-purple exp-table-textdot">to ensure consistent ids are generated between the</p>
                                <img width={15} alt="" className="i-purple" src="/assets/rsu-image/icons/verify-black.svg" />
                            </div>
                            </td>
                            <td className="py-4">
                            <p className="mb-0 ci-purple ">7868SD78</p>
                            </td>
                            <td className="py-4">
                            <div className=" d-flex gap-2 align-items-start c-pointer " >
                                <p className="mb-0 ci-purple">6 Hours ago</p>
                                <img width={15} alt="" className="i-purple" src="/assets/rsu-image/icons/report.svg" />
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="pt-4 pb-3 ps-3"><p className="mb-0">Transfer</p></td>
                            <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start " >
                                <div className="exp-table-img">
                                <img alt="" src="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" />
                                </div>
                                <p className="mb-0 exp-table-textdot">to ensure consistent ids are generated between the</p>
                            </div>
                            </td>
                            <td className="pt-4 pb-3">
                                <div className="d-flex align-items-start gap-2 " >
                                <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
                                <div>
                                    <p className="mb-0">500</p>
                                    <div className="ci-grey f10" >(1,234.65)</div>
                                </div>
                                </div>
                            </td>
                            <td className="pt-4 pb-3"><p className="mb-0">1</p></td>
                            <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start " >
                                <p className="mb-0 ci-purple exp-table-textdot">to ensure consistent ids are generated between the</p>
                                <img width={15} alt="" className="i-purple" src="/assets/rsu-image/icons/verify-black.svg" />
                            </div>
                            </td>
                            <td className="pt-4 pb-3">
                            <p className="mb-0">---</p>
                            </td>
                            <td className="pt-4 pb-3">
                            <div className=" d-flex gap-2 align-items-start c-pointer " >
                                <p className="mb-0 ci-white">6 Hours ago</p>
                            </div>
                            </td>
                        </tr>
                        
                        </tbody>
                    </Table>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Offer " title="Offer ">
            <div className="row ps-lg-3">
                    <div className="col exp-sub-tab my-3">
                    <div>
                        <div className="row">
                        <div className="col-12 col-lg-6 mb-2 mb-lg-0" >
                            <Search/>
                        </div>
                        <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                            <Select selected="Single Items" />
                        </div>
                        <div className="col-12 col-lg-3 mb-2 mb-lg-0" >
                            <Select selected="Price" />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                            <CardBuy
                            img="/assets/rsu-image/music/music-demo.png"  
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
                            price="Price" 
                            time="5 days left" 
                            fav="12"
                            coin="12"
                            href="#"
                            button="Buy"
                            link="/Explore-collection/detail-music"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </Tab>

          </Tabs>
          

          </div>
        </div>
      </div>
    </section>
        
    </div>
    </>
  );
};

export default ExploreCollectionProfile;
ExploreCollectionProfile.layout = Mainlayout;
