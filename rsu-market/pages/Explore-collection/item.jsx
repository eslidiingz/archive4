import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import { Table,Tabs, Tab} from "react-bootstrap";
import HeaderExplore from "../../components/layouts/HeaderExplore";
import Filter from "../../components/layouts/Filter";
import Search from "../../components/form/search";
import Select from "../../components/form/select";
import CardBuy from "../../components/card/CardBuy";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ExploreCollectionItem = () => {

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
    <HeaderExplore
      title="Lorem Ipsum is simply"
      name="dbai"
      item="40"
      owners="16"
      price="4.61"
      volume="120"
      img="/assets/rsu-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" />

    <section className="bg-blue">
      <div className="container d-flex flex-column flex-lg-row">
        <div className="w-300-100 py-4">
          <Filter/>
        </div>
        <div className="col bd-left exp-tab" >
          <div>
          <Tabs defaultActiveKey="Items" id="main-tab" className="mb-3">
            <Tab eventKey="Items" title="Items">
              <div className="row ps-lg-3">
                <div className="col exp-sub-tab my-3">
                  <div>
                    <div className="row">
                      <div className="col-12" >
                        <h5 className="ci-white" >All (20 Items)</h5>
                      </div>
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
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png" 
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"  
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png"  
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"  
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png"  
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"  
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                        <CardBuy
                          img="/assets/rsu-image/music/music-demo.png"  
                          detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"  
                          time="5 days left" 
                          fav="12"
                          coin="12"
                          button="Buy"
                          link="/Explore-collection/detail-music"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <Tabs defaultActiveKey="All" id="sub-tab" className="mb-3">
                    <Tab eventKey="All" title="All">
                      <div className="row">
                        <div className="col-12" >
                          <h5 className="ci-white" >All (20 Items)</h5>
                        </div>
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
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            link="/Explore-collection/detail-art"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            link="/Explore-collection/detail-music"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="Art" title="Art">
                      <div className="row">
                        <div className="col-12" >
                          <h5 className="ci-white" >All (20 Items)</h5>
                        </div>
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
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            hideplay="d-none"
                            link="/Explore-collection/detail-art"
                          />
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="Music" title="Music">
                      <div className="row">
                        <div className="col-12" >
                          <h5 className="ci-white" >All (20 Items)</h5>
                        </div>
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
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            link="/Explore-collection/detail-music"
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mt-lg-4">
                          <CardBuy
                            img="/assets/rsu-image/music/music-demo.png" 
                            detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is" 
 
                            time="5 days left" 
                            fav="12"
                            coin="12"

                            button="Buy"

                            link="/Explore-collection/detail-music"
                          />
                        </div>
                      </div>
                    </Tab>
                  </Tabs> */}
                </div>
              </div>
            </Tab>
            <Tab eventKey="Activity" title="Activity">
              <div className="row ps-lg-3">
                <div className="col-12 col-md-6 col-xl-3">
                  <Select selected="Last 90 Days" />
                </div>
                <div className="col-6 col-md-3 col-xl-2 py-2 mt-2 mt-md-0">
                  <h6 className="mb-0 ci-white">90 Day Avg. Price</h6>
                  <h6 className="mb-0 ci-blue fw-bold">0.5</h6>
                </div>
                <div className="col-6 col-md-3 col-xl-2 py-2 mt-2 mt-md-0">
                  <h6 className="mb-0 ci-white">90 Day Volume</h6>
                  <h6 className="mb-0 ci-blue fw-bold">3</h6>
                </div>
              </div>
              <div className="row ps-lg-3 my-3">
                <div className="col-12">
                  <div className="bg-dark-card chart">
                    <div className="d-flex justify-content-between">
                      <h4 className="ci-white" >Daily Views</h4>
                      <select className="form-select input-search-set height-54 w-fit"  aria-label="Default select example">
                          <option selected>Last 90 Days</option>
                          <option value="1">value1</option>
                          <option value="2">value2</option>
                          <option value="3">value3</option>
                      </select>
                    </div>
                    <Line data={data} />
                  </div>
                </div>
              </div>
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
          </Tabs>

          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ExploreCollectionItem;
ExploreCollectionItem.layout = Mainlayout;
