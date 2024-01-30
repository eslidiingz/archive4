import React, { Component } from "react";
import Slider from "react-slick";
import CardTrending from "../card/CardTrending";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={"arrow-next-customs layout-arrow-silder next-music-position"}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={"arrow-prev-customs layout-arrow-silder prev-music-position"}
      onClick={onClick}
    />
  );
}

export default class SlideHeaderMusic extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <>
        <Slider {...settings}>
          <div>
            <div className="row px-2">
              {/* <div className="col-sm-6 hilight-content2-2">
                <CardTrending
                  img="assets/rsu-image/music/music-demo.png"
                  detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                  time="5 days left"
                  fav="120"
                  price="153"
                  link="/Explore-collection/detail-music"
                ></CardTrending>
              </div> */}
              {/* <div className="col-sm-6 layout-bot">
                <CardTrending
                  img="assets/rsu-image/music/music-demo.png"
                  detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                  time="5 days left"
                  fav="120"
                  price="153"
                  link="/Explore-collection/detail-music"
                ></CardTrending>
              </div> */}
            </div>
          </div>
          <div>
            <div className="row px-2">
              {/* <div className="col-sm-6 hilight-content2-2">
                <CardTrending
                  img="assets/rsu-image/music/music-demo.png"
                  detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                  time="5 days left"
                  fav="120"
                  price="153"
                  link="/Explore-collection/detail-music"
                ></CardTrending>
              </div> */}
              {/* <div className="col-sm-6 layout-bot">
                <CardTrending
                  img="assets/rsu-image/music/music-demo.png"
                  detail="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                  time="5 days left"
                  fav="120"
                  price="153"
                  link="/Explore-collection/detail-music"
                ></CardTrending>
              </div> */}
            </div>
          </div>
        </Slider>
      </>
    );
  }
}
