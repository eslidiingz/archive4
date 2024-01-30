import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";


const NewsDetail = () => {
 
  return (
    <>
    <section className="layout_news">
      <div className="container fix-container my-md-5 my-3">
        <div className="row">
            <div className="body_detailNews">
                <div className="col-12">
                    <p className="tittle_detailNews">วันที่ 9 มิถุนายน 2565 ประเทศไทยก็ได้ออกนโยบายปลดล็อกกัญชา</p>
                    <p className="date_detailNews">31/05/2022</p>
                    <img src="../assets/image/news/01/banner.webp" className="w-100 mb-4"/>
                    <p className="text-detail_detailNews">วันที่ 9 มิถุนายน 2565 ประเทศไทยก็ได้ออกนโยบายปลดล็อกกัญชา โดยทุกส่วนของกัญชา กัญชง ถือว่าไม่เป็นยาเสพติด ประชาชนสามารถปลูกได้โดยไม่ต้องขออนุญาต เพียงแค่ทำการลงทะเบียน จดแจ้งตามวัตถุประสงค์ปลูกเท่านั้น โดยวัตถุประสงค์ของการปลูกคือ เพื่อดูแลสุขภาพของตนเองและใช้ในครัวเรือน เพื่อนำไปใช้ในการปรุงยาสำหรับผู้ป่วยเฉพาะรายของกรณีที่เป็นแพทย์ แผนไทย แพทย์แผนไทยประยุกต์ และหมอพื้นบ้าน และเพื่อใช้ในเชิงพาณิชย์หรือในทางอุตสาหกรรม สำหรับการผลิตแปรรูปส่วนอื่น ๆ ของพืชกัญชากัญชง เช่น ใบ ช่อดอก ก้าน ราก ไม่ต้องขออนุญาต แต่สารสกัด THC ต้องไม่เกิน 0.2% จะไม่ถือว่าเป็นยาเสพติด</p>
                    <div className="row mb-5">
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/01/01.webp" className="w-100 mb-2"/>
                        </div>
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/01/02.webp" className="w-100 mb-2"/>
                        </div>
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/01/03.webp" className="w-100 mb-2"/>
                        </div>
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/01/04.webp" className="w-100 mb-2"/>
                        </div>
                    </div>
                    <hr className="hr_detailNews"/>
                    <p className="text-user_deatilNews"> บทความโดย : 
                        <span className="text-user2_deatilNews"> UserName01</span>
                    </p>
                </div>
            </div>
       
        </div>
      </div>
    </section>
      
    </>
  );
};

export default NewsDetail;
NewsDetail.layout = Mainlayout;
