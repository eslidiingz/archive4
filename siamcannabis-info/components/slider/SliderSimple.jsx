import React, { Component } from "react";
import Slider from "react-slick";
import ButtomDots from "../buttom/ButtomDots";



export default class SliderSimple extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 3,
            infinite: true,

          }
        },
        {
          breakpoint: 1068,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
            infinite: true,

          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };

    return (
      <>
        <Slider {...settings}>
        <div className="col-6 set-box-slider">
          <div className="layout-main_cardProject">
            <div className="row body-card_project ms-lg-1">
              <div className="col-5 d-lg-block d-none">
                <img src="../assets/image/home/img-002.png" className="img-card_project" />
              </div>
              <div className="col-lg-7 col-12 mt-lg-3 layout-sec_cardProject p-0">
                <div className="px-lg-3">
                  <ButtomDots
                    classset="btn btn-dots-green mb-3"
                    // classset="btn btn-dots-yellow mb-3"
                    // classset="btn btn-dots-red mb-3"
                    text="Running Project"
                  />
                </div>
                <p className="text-detail_cardProject p-3">มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)</p>
                <div className="row p-3">
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/location.svg" />
                      <p className="text-tittle_cardProject">Location</p>
                    </div>
                    <p className="text-detail2_cardProject">PlaceLand</p>
                  </div>
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/quantity.svg" />
                      <p className="text-tittle_cardProject">Quantity of sales</p>
                    </div>
                    <p className="text-detail2_cardProject">2,000</p>
                  </div>
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/holding.svg" />
                      <p className="text-tittle_cardProject">Holding</p>
                    </div>
                    <p className="text-detail2_cardProject">6 month</p>
                  </div>
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/profit.svg" />
                      <p className="text-tittle_cardProject">Profit</p>
                    </div>
                    <p className="text-detail2_cardProject">30 %</p>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/time.svg" />
                      <p className="text-tittle_cardProject">Time</p>
                    </div>
                    <p className="text-detail2_cardProject">10 Jan 2022 - 10 Jun 2022</p>
                  </div>
                  <div className="col-12">
                    <hr />
                  </div><div className="col-12">
                    <button className="btn btn-see-more">
                      อ่านรายละเอียดเพิ่มเติม
                      <img src="../assets/image/card/047-star1.svg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 set-box-slider">
          <div className="layout-main_cardProject">
            <div className="row body-card_project ms-lg-1">
              <div className="col-5 d-lg-block d-none">
                <img src="../assets/image/project/Rectangle215.webp" className="img-card_project" />
              </div>
              <div className="col-lg-7 col-12 mt-lg-3 layout-sec_cardProject p-0">
                <div className="px-lg-3">
                  <ButtomDots
                    classset="btn btn-dots-green mb-3"
                    // classset="btn btn-dots-yellow mb-3"
                    // classset="btn btn-dots-red mb-3"
                    text="Running Project"
                  />
                </div>
                <p className="text-detail_cardProject p-3">Sarinee Garden - Cannabis</p>
                <div className="row p-3">
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/location.svg" />
                      <p className="text-tittle_cardProject">Location</p>
                    </div>
                    <p className="text-detail2_cardProject">PlaceLand</p>
                  </div>
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/quantity.svg" />
                      <p className="text-tittle_cardProject">Quantity of sales</p>
                    </div>
                    <p className="text-detail2_cardProject">2,000</p>
                  </div>
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/holding.svg" />
                      <p className="text-tittle_cardProject">Holding</p>
                    </div>
                    <p className="text-detail2_cardProject">6 month</p>
                  </div>
                  <div className="col-sm-6 mb-4">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/profit.svg" />
                      <p className="text-tittle_cardProject">Profit</p>
                    </div>
                    <p className="text-detail2_cardProject">30 %</p>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <img src="../assets/image/project/time.svg" />
                      <p className="text-tittle_cardProject">Time</p>
                    </div>
                    <p className="text-detail2_cardProject">10 Jan 2022 - 10 Jun 2022</p>
                  </div>
                  <div className="col-12">
                    <hr />
                  </div><div className="col-12">
                    <button className="btn btn-see-more">
                      อ่านรายละเอียดเพิ่มเติม
                      <img src="../assets/image/card/047-star1.svg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </Slider>
      </>
    );
  }
}