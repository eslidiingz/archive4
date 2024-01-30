import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";


const NewsDetail04 = () => {
 
  return (
    <>
    <section className="layout_news">
      <div className="container fix-container my-md-5 my-3">
        <div className="row">
            <div className="body_detailNews">
                <div className="col-12">
                    <p className="tittle_detailNews">โคราชเปิดคลินิกกัญชาเอกชนแห่งแรก ภท.ติววิสาหกิจชุมชนรู้โทษกัญชาใต้ดิน</p>
                    <p className="date_detailNews">27/02/2022</p>
                    <img src="../assets/image/news/04/banner.png" className="w-100 mb-4"/>
                    <p className="text-detail_detailNews">วันที่ 27 กุมภาพันธ์ 2565 ณ โรงแรมเฮอร์มิเทจ อำเภอเมืองนครราชสีมา นางสาวสุนนิศา โสบกระโทก ผู้บริหารสหคลินิก เรเมดี้ แคนน์ โคราช ร่วมเปิด “ศูนย์ฝึกอบรม และศูนย์ถ่ายทอดนวัตกรรมการแพทย์ผสมผสาน” และเปิดบ้าน “สหคลินิก เรเมดี้ แคนน์ โคราช” และคลินิกกัญชาทางการแพทย์ โดยมีเครือข่ายวิสาหกิจชุมชนและผู้สนใจแสดงความยินดี และร่วมกิจกรรมแนะนำโปรแกรมรักษาและดูแลสุขภาพด้วยศาสตร์กัญชาและผลิตภัณฑ์กัญชา สาธิตนวดเข้าตำรับกัญชาและ Get Alarmz การแสดงนวัตกรรมดูแลสุขภาพและความปลอดภัยด้วยระบบอัจฉริยะ การช่วยเหลือทางการแพทย์ฉุกเฉินตลอด ๒๔ ชั่วโมง รวมทั้งเวทีเสวนา KORAT Next @ Medical Cannabis, Innovation creates a healthy economy หัวข้อ “คลินิกกัญชาทางการแพทย์ : ทางเลือกใหม่ด้านการรักษาและสร้างเศรษฐกิจสุขภาพ”</p>
                    <p className="text-detail_detailNews">โดยสหคลินิก เรเมดี้ แคนน์โคราช ซึ่งเป็นคลินิกกัญชาและกัญชงเพื่อการแพทย์แห่งแรกของ จ.นครราชสีมา ให้บริการแบบผสมผสานทั้งการแพทย์แผนไทย แพทย์พื้นบ้านแผนจีนและการแพทย์แผนปัจจุบัน เพื่ออำนวยความสะดวกให้ประชาชน และเป็นทางเลือกในการดูแลรักษาผู้ป่วยที่มีอาการตามกลุ่มอาการและโรคที่สามารถรักษาได้ด้วยตำรับยาแผนไทยที่มีกัญชา และกัญชง </p>
                    <p className="text-detail_detailNews">นายสมศักดิ์ พันธ์เกษม ส.ส. เขต ๑๑ จ.นครราชสีมา เปิดเผยว่า สาระสำคัญคือการปลดกัญชาออกจากยาเสพติดประเภท ๕ ซึ่งมีผลบังคับใช้ ๑๒๐ วัน หลังประกาศในราชกิจจานุเบกษา ระหว่างนี้ พรรคภูมิใจไทยได้ดำเนินการศึกษาวิจัยกัญชา กัญชง ที่ผลิตในประเทศไทย เพื่อใช้ประโยชน์ทางการแพทย์ตอบโจทย์การรักษาโรคได้ชัดเจนและเป็นการสร้างรายได้ให้ประชาชน แต่จำเป็นต้องควบคุมการผลิตและใช้ตามนโยบายรัฐบาล</p>

                    <div className="row mb-5">
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/04/01.png" className="w-100 mb-2"/>
                        </div>
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/04/02.png" className="w-100 mb-2"/>
                        </div>
                    </div>
                    <hr className="hr_detailNews"/>
                    <p className="text-user_deatilNews"> บทความโดย : 
                        <span className="text-user2_deatilNews">ส่วนประชาสัมพันธ์ มทส.</span>
                    </p>
                </div>
            </div>
       
        </div>
      </div>
    </section>
      
    </>
  );
};

export default NewsDetail04;
NewsDetail04.layout = Mainlayout;
