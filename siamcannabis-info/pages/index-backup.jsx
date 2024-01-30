import { useState } from "react";
import Mainlayout from "../components/layouts/Mainlayout";
import React from "react";
import Card from "../components/card/Card";
import CardProject from "../components/card/CardProject";
import Slider from "react-slick";
import Link from "next/link";



function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <button 
    type="button" 
    data-role="none" 
    className="arrow-next-customs d-none d-lg-block"
    onClick={onClick} ></button>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button 
    type="button" 
    data-role="none" 
    className="arrow-prev-customs d-none d-lg-block" 
    onClick={onClick}></button>
  );
}


const presalePage = () => {

  const [cover, setCover] = useState("../assets/image/card/img-04.webp");

  const CardDrops = [
    {
      id: "4",
      key: "4",
      img: "../assets/image/card/img-04.webp",
      title: "วันที่ 9 มิถุนายน 2565 ประเทศไทยก็ได้ ออกนโยบายปลดล็อกกัญชา",
      href: "../news/detail",
    },
    {
      id: "3",
      key: "3",
      img: "../assets/image/news/02/banner.png",
      title: "มทส. เก็บ“ช่อดอกกัญชา” รุ่นแรก พร้อมส่งต่อวัตถุดิบกัญชาคุณภาพ เพื่อใช้ประโยชน์ทางการแพทย์ วันที่ 27 สิงหาคม 2563",
      href: "../news/detail02",
    },
    {
      id: "2",
      key: "2",
      img: "../assets/image/news/03/banner.png",
      title: "มทส. เก็บ“ช่อดอกกัญชา” รุ่นแรก พร้อมส่งต่อวัตถุดิบกัญชาคุณภาพ เพื่อใช้ประโยชน์ทางการแพทย์ วันที่ 27 สิงหาคม 2563 ",
      href: "../news/detail03",
    },
    {
      id: "1",
      key: "1",
      img: "../assets/image/news/04/banner.png",
      title: "โคราชเปิดคลินิกกัญชาเอกชนแห่งแรก ภท.ติววิสาหกิจชุมชนรู้โทษกัญชาใต้ดิน",
      href: "../news/detail04"
    },
  ];
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
  
            }
          },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true
          }
        }
      ]
    };
    const CardSettings = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true
          }
        }
      ]
    };
  return (
    <>
      <section>

        <div className=" container-fluid ">
          <div className="row">
            <div className="col-12 px-0 d-lg-block d-none">
              <img
                className="w-100 img-banner_homepage"
                src={cover}
              />
            </div>
          </div>
        </div>
        <div className="container container_custom py-lg-3 slider_moblie">
          <div className="row mb-4 adjust-hight">
          <Slider {...settings}>

          {CardDrops.map((item, key) => {
              return (
                item && (
                  <div className="col-lg-3 mb-3 mb-lg-0 px-lg-1 cursor-pointer" onClick={() => setCover(item.img)}>
                  {/* <Link href={`/news/detail/${item.id}`}> */}
                    <a>
                    <div className="d-lg-none d-block col-12">
                      <img src={item.img} className="w-100 img-banner_homepage" />
                      <Card
                        title={item.title}
                        href={`/news/detail/${item.id}`}
                      />
                    </div>
                    <div className="d-none d-lg-block">
                      <Card
                        img={item.img}
                        title={item.title}
                        href={`/news/detail/${item.id}`}
                      ></Card>
                    </div>
                    </a>
                  {/* </Link> */}
                  </div>

                  

                )
              );
            })}
          </Slider>
            {/* {CardDrops.map((item, key) => {
              return (
                item && (
                  <div className="col-lg-3 mb-3 mb-lg-0" onClick={() => setCover(item.img)}>
                    <Card
                      img={item.img}
                      title={item.title}
                      href={item.href}
                    ></Card>
                  </div>
                )
              );
            })} */}
            <Link href={"/news"}>
            <div className="col-12 d-flex justify-content-center justify-content-lg-end my-5 cursor-pointer ">
              <div className="d-flex btn-seemore_homepage">
                <p className="ci-color-green text_btn-seemore">ดูทั้งหมด</p>
                <img className="ps-2 d-none d-lg-block" src="../../assets/image/card/arrow.svg" />
                <img className="ps-2 d-lg-none d-block" src="../../assets/image/project/Vector.svg" />
              </div>
            </div>
            </Link>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="container position-relative ">
          <div className="row">
            <div className="col-12">
              <img className="w-100" src="../assets/image/home/bg-001.webp" />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <p className="text-white">หากคุณมีสวนกัญชาเข้าร่วมกับเรา</p>
              <h3 className="ci-color-yellow">สนใจเข้าร่วมโครงการ </h3>
            </div>
            <div className="col-5">
              <p className="text-white">โครงการของเรายึดหลักการสร้างประโยชน์ สร้างงาน สร้างรายได้ พร้อมๆไปกับเพิ่มโอกาสทางธุรกิจกัญชาไทย สำหรับเฟสแรกเราร่วมสนับสนุนการปลูกกัญชามากถึง2 ไร่  และมุ่งมั่นตั้งใจที่จะร่วมสนับสนุนที่อื่นๆ ต่อไป</p>
            </div>
            <div className="col-3">
                <button className="btn btn-see-more margin-auto-set-sf">
                  สมัครเข้าร่วมโครงการ
                  <img className="ps-2" src="../assets/image/home/arrow-4.svg" />
                </button>
            </div>
          </div>
        </div>
      </section> */}
      <section>
        <div className="container">
          <div className="layout-homepage_sec2">
            <div className="row">
              <div className="col-lg-4 col-12">
                <p className="text-white justify-content-lg-start justify-content-center d-flex my-lg-0 my-2 mt-5">หากคุณมีสวนกัญชาเข้าร่วมกับเรา</p>
                <p className="ci-color-yellow text-tittle_homepaeSec2 justify-content-lg-start justify-content-center d-flex my-4 my-lg-0">สนใจเข้าร่วมโครงการ </p>
              </div>
              <div className="col-lg-5 col-12 d-flex align-items-center mb-5 mb-lg-0 mt-4">
                <p className="text-white">โครงการของเรายึดหลักการสร้างประโยชน์ สร้างงาน สร้างรายได้ พร้อมๆไปกับเพิ่มโอกาสทางธุรกิจกัญชาไทย สำหรับเฟสแรกเราร่วมสนับสนุนการปลูกกัญชามากถึง2 ไร่  และมุ่งมั่นตั้งใจที่จะร่วมสนับสนุนที่อื่นๆ ต่อไป</p>
              </div>
              <div className="col-lg-3 col-12 d-flex align-items-center mb-5 mb-lg-2">
                <Link href={"/register"}>
                  <button className="btn btn-see-more margin-auto-set-sf">
                    สมัครเข้าร่วมโครงการ
                    <img className="ps-2" src="../assets/image/home/arrow-4.svg" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-img">
        <div className=" container container_custom my-5">
          <div className="row d-flex set-box-home-sf">
            <div className="col-12">
              <p className="text-welcome_sec03 d-none d-md-block" >ยินดีต้อนรับเข้าสู่โลกการลงทุนคู่กับ NFT เรียนรู้เพิ่มเติมเกี่ยวกับ NFT ของเรา</p>
            </div>
            <div className="col-lg-6 col-12 set-text-center order-1 order-md-0">
              <p className="text-welcome_sec03 d-block d-md-none" >ยินดีต้อนรับเข้าสู่โลกการลงทุนคู่กับ NFT เรียนรู้เพิ่มเติมเกี่ยวกับ NFT ของเรา</p>
              <p className="text-main_sec03">
                สนใจลงทุน
              </p>
              {/* <img className="my-3 img_logo-sec03" src="../assets/image/home/logo-logo.webp" /> */}
              <div className="d-flex align-items-center my-3 w-100 justify-content-center justify-content-lg-start">
              <img src="../../assets/image/nav/logo-nav.svg"  className="img_logo-sec03"/>
                <div className="d-block">
                  <p className='text_logo-sec03'>SIAM CANNABIS</p>
                </div>
              </div>
              <p className="text-detail_sec03">แพลตฟอร์มการลงทุนที่สร้างขึ้นจากความมุ่งมั่นตั้งใจพัฒนาธุรกิจกัญชาไทย พร้อมๆไปกับตอบโจทย์การลงทุนด้วยระบบ blockchain</p>
              <div className="my-5">
                <button className="btn btn-goto margin-auto-set-sf">
                  ไปยัง siam cannabis
                  <img className="ps-2" src="../assets/image/home/arrow-3.svg" />
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-12 order-0 order-md-1">
              <img className="w-100" src="../assets/image/home/img-001.webp" />
            </div>
          </div>
          <div className="row row-set">
            <div className="col-12">
              <p className="text-main2_sec03">เริ่มลงทุนเลย. หาโปรเจ็คที่ใช่สำหรับคุณ</p>
              <p className="text-topic_sec03">โปรเจ็คสำหรับคุณ</p>
            </div>
            <div className="slider_CardProject px-0">
                <Slider {...CardSettings}>
                  <div className="col-lg-6 col-12 px-3">
                      <CardProject
                        title="มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)"
                        location="Location"
                        typelocation="PlaceLand"
                        quantity="Quantity of sales"
                        typequantity="2,000"
                        holding="Holding"
                        typeholding="6 month"
                        profit="Profit"
                        typeprofit="30 %"
                        time="Time"
                        tpyetime="10 Jan 2022 - 10 Jun 2022"
                        ready={true}
                    />
                    </div>
                    <div className="col-lg-6 col-12 px-3">
                      <CardProject
                        title="Sarinee Garden - Cannabis"
                        location="Location"
                        typelocation="PlaceLand"
                        quantity="Quantity of sales"
                        typequantity="2,000"
                        holding="Holding"
                        typeholding="6 month"
                        profit="Profit"
                        typeprofit="30 %"
                        time="Time"
                        tpyetime="10 Jan 2022 - 10 Jun 2022"
                        ready={true}
                      />
                  </div>
                </Slider>
            </div>
            
          </div>
          <div className="bg-contact my-5">
            <div className="row d-flex align-items-center">
              <div className="col-lg-4 col-12 d-flex justify-content-center justify-content-lg-start">
                <p className="tittle_contact">ช่องทางติดตามเรา</p>
              </div>
              <div className="col-lg-8 col-12">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Link href={""}>
                    <div className="d-flex layout_social margin-auto-set-sf">
                      <img className="mx-2 icon-img_contact" src="../assets/image/footer/Line.png" />
                      <p className="text-social_contact">Line official</p>
                    </div>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Link href={""}>
                    <div className="d-flex layout_social margin-auto-set-sf">
                      <img className="mx-2 icon-img_contact" src="../assets/image/footer/y.png" />
                      <p className="text-social_contact">Youtube</p>
                    </div>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Link href={""}>
                    <div className="d-flex layout_social margin-auto-set-sf">
                      <img className="mx-2 icon-img_contact" src="../assets/image/footer/m.png" />
                      <p className="text-social_contact">Messenger</p>
                    </div>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Link href={""}>
                    <div className="d-flex layout_social margin-auto-set-sf">
                      <img className="mx-2 icon-img_contact" src="../assets/image/footer/f.png" />
                      <p className="text-social_contact">Facebook</p>
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

    </>
  );
};

export default presalePage;
presalePage.layout = Mainlayout;
