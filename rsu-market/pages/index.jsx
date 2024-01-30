import Link from "next/link";
import Mainlayout from "../components/layouts/Mainlayout";
import React from "react";
import CardTrending from "../components/card/CardTrending";
import { Tabs, Tab } from "react-bootstrap";
import SlideHeaderMusic from "../components/Slide/SlideHeaderMusic";
import SlideTrending from "../components/Slide/SlideTrending";
import TopArtists from "../components/market/TopArtists";
import AdWordsList from "../components/market/AdWords";
import MarketExplore from "../components/market/Explore/MarketExplore";

const Musicnft = () => {
  return (
    <>
      <div>
        {/* section 01  */}
        <section className="hilight-sections">
          <div className="container">
            {/* end-left  */}
            <div className="row hilight-content2-1">
              <div className="col-lg-6 hilight-content2-2">
                <p className="small-title mb-4">Music NFT Marketplace</p>
                <p className="text02 mb-5">
                  Lorem Ipsum has been the industry s standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries,
                </p>
                <div>
                  <button className="btn btn01 btn-hover color-1 me-2">
                    <a href="#" className="text-white">
                      Earn With Your Music Now
                    </a>
                  </button>
                  <div className="row mt-4">
                    <div className="col-3 layout-m01" align="left">
                      <p className="text01">240k+</p>
                      <p className="text01-2">Artists NFTs</p>
                    </div>
                    <div className="col-2">
                      <p className="text01" align="center">
                        12k+
                      </p>
                      <p className="text01-2">Artists</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* end-left  */}
              {/* right  */}
              <div className="col-lg-6 layout-slider_mf01 pe-0">
                <SlideHeaderMusic />
              </div>
              {/* end-right  */}
            </div>
          </div>
        </section>
        {/* end-sction 01  */}
        {/* section 02  */}
        <section className="hilight-section02 pt-3">
          <div className="container">
            <div className="row">
              {/* Top Artists  */}
              <TopArtists />
              {/* end-Top Artists  */}
              {/* Trending in all categories  */}
              {/* header 02 */}
              <div className="col-6 col-6-1 mt-5 mb-4" align="left">
                <div className="dropdown">
                  <p className="text03">
                    Trending in{" "}
                    <a className="text07">
                      all categories <i className="fas fa-angle-down"></i>
                    </a>
                  </p>
                  <div className="dropdown-content">
                    <a href="#" className="text08">
                      Trending in{" "}
                    </a>
                    <a href="#" className="text08">
                      Trending in{" "}
                    </a>
                    <a href="#" className="text08">
                      Trending in{" "}
                    </a>
                  </div>
                </div>
              </div>
              {/* end-header 02  */}
              {/* card 02  */}
              {/* Slider homepage 02  */}
              <SlideTrending />
              {/* end-Slider homepage 02 */}
              {/* card  */}
            </div>
          </div>
          {/* End-Trending in all categories  */}
          {/* Create and sell your NFTs  */}
          <AdWordsList />
          {/* end-Create and sell your NFTs  */}
          {/* Explore  */}
          <div className="container">
            <div className="row">
              {/* header  */}
              <div className="col-12 layout03 mb-4" align="left">
                <p className="text03">Explore</p>
              </div>
              {/* end-header  */}
              <div className="trending position-relative">
                <Tabs
                  defaultActiveKey="New"
                  id="uncontrolled-tab-example"
                  className="layout-tab02 flex-scroll"
                >
                  <Tab eventKey="New" title="New" tabClassName="w-170-tab">
                    <MarketExplore />
                  </Tab>
                  <Tab eventKey="Hot" title="Hot">
                    <MarketExplore />
                  </Tab>
                </Tabs>
                <Link href="/Explore-collection">
                  <div className="btn-seemore">See More</div>
                </Link>
              </div>
            </div>
          </div>
          {/* end-Explore */}
        </section>
        {/* end-section 02  */}
      </div>
    </>
  );
};

export default Musicnft;
Musicnft.layout = Mainlayout;
