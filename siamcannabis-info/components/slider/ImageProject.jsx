import { useState } from "react";
import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
import Slider from "react-slick";


export default function ImageProject() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagesIndex, setimagesIndex] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const Projects = [
    {
      id: 1,
      name: "มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)",
      images: [
        "../assets/image/project/AnyConv.com__Rectangle185.webp",
        "../assets/image/project/AnyConv.com__Rectangle186.webp",
        "../assets/image/project/AnyConv.com__Rectangle189.webp",
        "../assets/image/project/AnyConv.com__Rectangle190.webp",
        "../assets/image/project/Rectangle215.webp"
      ]
    },
    {
      id: 2,
      name: "มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)",
      images: [
        "../assets/image/project/AnyConv.com__Rectangle186.webp",
        "../assets/image/project/AnyConv.com__Rectangle189.webp",
        "../assets/image/project/AnyConv.com__Rectangle190.webp",
        "../assets/image/project/Rectangle215.webp",
        "../assets/image/project/AnyConv.com__Rectangle185.webp"
      ],
    },
    {
      id: 3,
      name: "มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)",
      images: [
        "../assets/image/project/AnyConv.com__Rectangle189.webp",
        "../assets/image/project/AnyConv.com__Rectangle190.webp",
        "../assets/image/project/Rectangle215.webp",
        "../assets/image/project/AnyConv.com__Rectangle186.webp",
        "../assets/image/project/AnyConv.com__Rectangle185.webp"
      ]
    },
    {
      id: 4,
      name: "มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)",
      images: [
        "../assets/image/project/AnyConv.com__Rectangle190.webp",
        "../assets/image/project/Rectangle215.webp",
        "../assets/image/project/AnyConv.com__Rectangle185.webp",
        "../assets/image/project/AnyConv.com__Rectangle186.webp",
        "../assets/image/project/AnyConv.com__Rectangle189.webp"
      ],
    }
  ];

  return (
    <>
    <div className="row">
      {Projects.map((project, index) => {
        return (
        <div className="col-lg-4 col-sm-6 col-6 mb-sm-3">
            <figure className="snip0013">
            <img
                key={project.id}
                onClick={() => {setIsOpen(true); setimagesIndex(index);}}
                className="img-slider_project"
                src={project.images[0]}
                alt="sample32"
            />
                <div onClick={() => {setIsOpen(true); setimagesIndex(index);}} className="d-none d-lg-block">
                  <img className="icon-zoom_imgSlider" src="../assets/image/project/Group.svg"/>
                </div>
                <div onClick={() => {setIsOpen(true); setimagesIndex(index);}} className="d-lg-none d-block">
                  <p className="text_onMobile_project">See More +</p>
                </div>
            </figure>
        </div>
        
        );
      })}
    </div>
      {isOpen && (
        <Lightbox
          imageLoadErrorMessage="This image failed to load"
          imageTitle={Projects[imagesIndex].name}
          mainSrc={Projects[imagesIndex].images[photoIndex]}
          nextSrc={
            Projects[imagesIndex].images[
              (photoIndex + 1) % Projects[imagesIndex].images.length
            ]
          }
          prevSrc={
            Projects[imagesIndex].images[
              (photoIndex + Projects[imagesIndex].images.length - 1) %
                Projects[imagesIndex].images.length
            ]
          }
          onCloseRequest={() => {
            setIsOpen(false);
            setimagesIndex(null);
          }}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + Projects[imagesIndex].images.length - 1) %
                Projects[imagesIndex].images.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex(
              (photoIndex + 1) % Projects[imagesIndex].images.length
            )
          }
        />
      )}
    </>
  );
}
