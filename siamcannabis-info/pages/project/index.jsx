import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import CardProject from "../../components/card/CardProject";
import ImageProject from "../../components/slider/ImageProject";
// import ImageProjectNone from "../../components/slider/ImageProjectNone";

const Project = () => {
	return (
		<>
			<section className="layout_news">
				<div className="container fix-container my-md-5 my-3">
					<div className="body_detailNews">
						<div className="row">
							<div className="col-12">
								<p className="header_project">
									มหาวิทยาลัยเทคโนโลยีสุรนารี (มทส.)
								</p>
								<p className="date_detailNews">31/05/2022</p>
								{/* <img src="../assets/image/project/Rectangle193.webp" className="w-100 my-3"/> */}
								<img
									src="/assets/image/project/sut.jpeg"
									className="w-100 my-3"
								/>
								<p className="topic_project">ข้อมูล</p>
								<p className="text-information_project">
									ฟาร์มกัญชา กัญชง มหาวิทยาลัยเทคโนโลยีสุรนารี
									จังหวัดนครราชสีมา
									ถือเป็นฟาร์มแรกที่เข้าร่วมโครงการของเรา
									โดยมีเป้าหมายร่วมกันในการพัฒนาตั้งแต่กระบวนการปลูกไปจนถึงการแปรรูปเพื่อจัดจำหน่าย
									โดยในส่วนของการพัฒนาสายพันธุ์ร่วมกันจัดทำเป็นผลงานทางวิชาการ
									เพื่อเผยแพร่องค์ความรู้ให้กับสาธารณชน
									สร้างความมั่นคงทางเศรษฐกิจ สาธารณสุข
									และสังคมของประเทศ โดยยึดหลักการสร้างประโยชน์
									สร้างงาน สร้างรายได้
									พร้อมๆไปกับการยกระดับพลิกฟื้นเศรษฐกิจของประเทศ
									และส่งให้ประเทศไทยเป็นเมดิคัลฮับรองรับการเป็นเมดิคัลทัวร์ริสซึม
								</p>
								<p className="text-information_project mb-5">
									สถานที่ตั้ง มหาวิทยาลัยเทคโนโลยีสุรนารี 111
									ถนนมหาวิทยาลัย ตำบลสุรนารี อำเภอเมือง
									จังหวัดนครราชสีมา 30000
								</p>
								{/* <p className="topic_project my-3">
									ประโยชน์ที่จะได้รับ Benefits
								</p>
								<ol>
									<li className="text-information-li_project">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit. Aenean eu fermentum
										augue, sit amet convallis augue.
									</li>
									<li className="text-information-li_project">
										nteger eu iaculis sem, sed euismod eros.
										Nulla facilisi. Proin luctus odio nunc,
										sed laoreet est bibendum vitae.
									</li>
									<li className="text-information-li_project">
										Sed a eleifend ex. Integer varius
										rhoncus euismod. Aliquam ac ultricies
										turpis, vitae eleifend ligula.
									</li>
									<li className="text-information-li_project">
										Aliquam faucibus erat ut tincidunt
										cursus. Cras et ullamcorper velit. In
										hac habitasse platea dictumst.
									</li>
									<li className="text-information-li_project">
										Nunc vitae dui quis risus elementum
										auctor.
									</li>
								</ol> */}
							</div>
							<div className="col-xl-8 mt-5 mb-5">
								{/* <CardProject/> */}
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
									ready={false}
								/>
							</div>
							<div className="col-12 mb-3">
								<p className="topic_project">รูปภาพ</p>
								<ImageProject />
							</div>
							<div className="col-lg-4 col-12">
								<p className="topic_project m-0">สถานที่ตั้ง</p>
								<p className="text-location_project">
									2972 Westheimer Rd. Santa Ana, Illinois
									85486 .
								</p>
								<p className="topic_project m-0">เบอร์ติดต่อ</p>
								<p className="text-location_project">
									(307) 555-0133
								</p>
								<div className="layout-btn_project">
									<a target="_self" href={`http://siamcannabis.io`}>
										<button className="btn btn-goto">
											ไปยัง siam cannabis
											<img
												className="ps-2 icon-goto_project"
												src="../assets/image/home/arrow-3.svg"
											/>
										</button>
									</a>
								</div>
							</div>
							<div className="col-lg-8 col-12">
								<p className="topic_project m-0">Google Map</p>
								<iframe
									className="map_project"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1613799.40599712!2d142.9841748625!3d-37.81459409999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad63bd62ecd7b03%3A0xd28f46660822d997!2sCostco%20Wholesale!5e0!3m2!1sth!2sth!4v1655893226138!5m2!1sth!2sth"
									allowfullscreen=""
									loading="lazy"
									referrerpolicy="no-referrer-when-downgrade"
								></iframe>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Project;
Project.layout = Mainlayout;
