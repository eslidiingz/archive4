import React, { Component } from "react";
import Slider from "react-slick";
import CardTrending from "../card/CardTrending";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={"arrow-next-customs layout-arrow-silder next-trend-position"}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={"arrow-prev-customs layout-arrow-silder prev-trend-position"}
      onClick={onClick}
    />
  );
}

export default class SlideTrending extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        <Slider {...settings}>
          <div className="col-12 col-md-6 col-lg-3 px-1">
            {/* <CardTrending
              img="assets/rsu-image/music/music-demo.png"
              detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
              time="5 days left"
              fav="120"
              price="153"
              link="/Explore-collection/detail-music"
            ></CardTrending> */}
          </div>
        </Slider>
      </>
    );
  }
}
