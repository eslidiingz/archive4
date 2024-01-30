import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Card from "../../components/card/Card";
import Link from "next/link";
import { useState } from "react";


const News = () => {
  const [ news, setNews ] = useState([])

  const handleFetchNews =async()=>{
        fetch('https://backoffice.siamcannabis.io/api/news-lists?populate=cover')
        .then((res)=>res.json())
        .then((res)=>setNews(res.data))
  }

  useEffect(()=>{
    handleFetchNews()
  },[])

    const CardDrops = [
      {
        id: "4",
        key: "4",
        img: "../assets/image/card/img-04.webp",
        title: "วันที่ 9 มิถุนายน 2565 ประเทศไทยก็ได้ ออกนโยบายปลดล็อกกัญชา",
        href: "news/detail",
      },
      {
        id: "3",
        key: "3",
        img: "../assets/image/news/02/banner.png",
        title: "มทส. เก็บ“ช่อดอกกัญชา” รุ่นแรก พร้อมส่งต่อวัตถุดิบกัญชาคุณภาพ เพื่อใช้ประโยชน์ทางการแพทย์ วันที่ 27 สิงหาคม 2563",
        href: "news/detail02",
      },
      {
        id: "2",
        key: "2",
        img: "../assets/image/news/03/banner.png",
        title: "มทส. เก็บ“ช่อดอกกัญชา” รุ่นแรก พร้อมส่งต่อวัตถุดิบกัญชาคุณภาพ เพื่อใช้ประโยชน์ทางการแพทย์ วันที่ 27 สิงหาคม 2563 ",
        href: "news/detail03",
      },
      {
        id: "1",
        key: "1",
        img: "../assets/image/news/04/banner.png",
        title: "โคราชเปิดคลินิกกัญชาเอกชนแห่งแรก ภท.ติววิสาหกิจชุมชนรู้โทษกัญชาใต้ดิน",
        href: "news/detail04"
      },
      ];
  return (
    <>
    <section className="layout_news">
      <div className="container fix-container mb-5">
        <div className="row ">
        <div className="col-12">
            <p className="header-text_news">ห้องรวมข่าว</p>
        </div>
            {news?.map((item, key) => {
                return (
                item && (
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
                    <Card
                        img={`https://backoffice.siamcannabis.io${item.attributes.cover.data.attributes.url}`}
                        title={item.attributes.title}
                        href={`/news/detail/${item.id}`}
                    ></Card>
                    </div>
                )
                );
            })}
        </div>
      </div>
      
    </section>
      
    </>
  );
};

export default News;
News.layout = Mainlayout;
