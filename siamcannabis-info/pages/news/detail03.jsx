import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";


const NewsDetail03 = () => {
 
  return (
    <>
    <section className="layout_news">
      <div className="container fix-container my-md-5 my-3">
        <div className="row">
            <div className="body_detailNews">
                <div className="col-12">
                    <p className="tittle_detailNews">มทส. เก็บ“ช่อดอกกัญชา” รุ่นแรก พร้อมส่งต่อวัตถุดิบกัญชาคุณภาพ เพื่อใช้ประโยชน์ทางการแพทย์ วันที่ 27 สิงหาคม 2563</p>
                    <p className="date_detailNews">27/08/2020</p>
                    <img src="../assets/image/news/03/banner.png" className="w-100 mb-4"/>
                    <p className="text-detail_detailNews"> ฟาร์มกัญชา มทส. สำนักวิชาเทคโนโลยีการเกษตร มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)   เปิดจำหน่ายต้นกล้ากัญชา“พันธุ์ฝอยทอง ภูผายล” ถิ่นกำเนิดจากจังหวัดสกลนคร ที่ผ่านการศึกษาทดสอบคัดแยกสายพันธุ์กว่า   2 ปี กระทั่งได้สายพันธุ์ที่มีคุณลักษณะดี โตเร็ว ลำต้นแข็งแรง ออกดอกง่ายเหมาะสมกับ สภาพอากาศของประเทศไทย ให้ผลผลิตสูง     1 ต้นสดรวมกว่า 2.38 กิโลกรัม ตั้งแต่ ราก ลำต้น ใบ และช่อดอก  ภายใต้วิธีการปลูกแบบปลอดภัย และการ ดูแลบำรุงรักษาด้วยระบบการปลูกที่มีคุณภาพ ลำต้นแข็งแรงสมบูรณ์สามารถสูงได้เต็มที่ถึง   4 เมตร ให้ช่อดอกแน่นภายในระยะเวลา 4 เดือนครึ่ง พร้อมให้สารสำคัญออกฤทธิ์สูงระดับมาตรฐานที่ใช้ได้ทางการแพทย์และสาธาณสุข ค่าวิเคราะห์สาร THC เฉลี่ย 8 – 12 เปอร์เซนต์</p>
                    <p className="text-detail_detailNews">ต้นกล้ากัญชา “พันธุ์ฝอยทอง ภูผายล” พร้อมจำหน่ายแล้ว มีอายุประมาณ 3 สัปดาห์ ความสูงเฉลี่ย 20-30 เซนติเมตร ลำต้นแข็งแรง วัสดุปลูกมีการผสมไตรโครเดอร์มา หมดปัญหารากเน่าและเชื้อราก่อโรค ลำต้นสมบูรณ์แข็งแรงทุกต้น จำหน่ายราคาต้นละ 100 บาท ผู้สั่งซื้อต้นกล้า จำนวน 1-2,000 ต้น ราคา 100 บาท  จำนวน 2001– 20,000 ต้น ราคา 80 บาท จำนวน 20,001 ต้นขึ้นไป ราคา 60 บาท   นอกจากนี้ ยังจำหน่าย “ต้นกล้ากัญชง พันธุ์ลูกผสมชาลอตแองเจิ้ล” อีกด้วย</p>

                    <div className="row mb-5">
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/03/01.png" className="w-100 mb-2"/>
                        </div>
                        <div className="col-sm-3 col-6">
                            <img src="../assets/image/news/03/02.png" className="w-100 mb-2"/>
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

export default NewsDetail03;
NewsDetail03.layout = Mainlayout;
