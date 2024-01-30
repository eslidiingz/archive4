// import React from "react";
import React, { useState } from "react";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";

// import Viewer from "react-viewer";
// import Lightbox from "react-awesome-lightbox";
// import "react-awesome-lightbox/build/style.css";


var photos = [
"../assets/image/project/AnyConv.com__Rectangle185.webp",
"../assets/image/project/AnyConv.com__Rectangle186.webp",
"../assets/image/project/AnyConv.com__Rectangle189.webp",
"../assets/image/project/AnyConv.com__Rectangle190.webp"
];

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button 
      type="button" 
      data-role="none" 
       className="arrow-next-customs"
      onClick={onClick} ></button>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button 
      type="button" 
      data-role="none" 
       className="arrow-prev-customs" 
      onClick={onClick}></button>
    );
  }
class ImageProjectNone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: photos,
      current: ""
    };
  }

  getSliderSettings() {
    return {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
              }
            },
            {
                breakpoint: 990,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
                breakpoint: 500,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
        ]
      };
    }

  handleClickImage = (e, image) => {
    e && e.preventDefault();

    this.setState({
      current: image
    });
  };

  handleCloseModal = e => {
    e && e.preventDefault();

    this.setState({
      current: ""
    });
  };

  render() {
    const settings = this.getSliderSettings();
    const { images, current } = this.state;

    return (
      <div className="carousel mb-5">
        <Slider {...settings}>
          {images.map(image => (
            <div className="p-1">
            <figure  className="snip0013">
              <img
                src={image}
                // alt="logo"
                onClick={e => this.handleClickImage(e, image)}
                className="img-slider_project"
                alt="sample32"
              />
            <div onClick={e => this.handleClickImage(e, image)}>
                <img className="icon-zoom_imgSlider" src="../assets/image/project/Group.svg"/>
            </div>
            </figure>
            </div>
            
          ))}

        </Slider>

        {current && (
          <Lightbox 
          mainSrc={current} 
          onCloseRequest={this.handleCloseModal} 
          />
          
        )}
        
      </div>
      
    );
  }
}

export default ImageProjectNone;
