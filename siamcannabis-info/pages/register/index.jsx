import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Link from "next/link";

const Reister = () => {
	return (
		<>
			<section className="layout_register">
				<div className="container fix-container my-md-5 my-3">
					<div className="body_detailNews">
						<div className="row">
							<div className="col-12">
								<p className="text-header_register">
									ร่วมกับเรา
								</p>
								<p className="text-header2_register">
									รับสมัครร่วมโครงการ
								</p>
								<p className="text-detail_register">
									โครงการของเรามีส่วนช่วยในการขับเคลื่อนระบบและกระตุ้นให้เกิดธุรกิจใหม่เป็นวงกว้าง
									โดยจะช่วยต่อยอดการพัฒนาเศรษฐกิจการเกษตร
									การแพทย์แผนไทยและการสาธารณสุข
									ยึดหลักการสร้างประโยชน์ สร้างงาน สร้างรายได้
									พร้อมๆไปกับการยกระดับพลิกฟื้นเศรษฐกิจของประเทศ
								</p>
								<Link href={"register/information"}>
									<div className="w-100 d-flex justify-content-center">
										<button className="d-flex align-items-center cursor-pointer btn_register">
											<p className="text-btn_register">
												สมัครร่วมโครงการ
											</p>
											<img
												className="ps-2"
												src="../assets/image/register/Vector.svg"
											/>
										</button>
									</div>
								</Link>
								<Link href={"/"}>
									<p className="text-gotohome_register cursor-pointer">
										กลับสู่หน้าแรก
									</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Reister;
Reister.layout = Mainlayout;
