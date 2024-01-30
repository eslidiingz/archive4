
import Mainlayout from "/components/layouts/Mainlayout"

import React, { useEffect } from "react"
import Link from "next/link"
import Form from "react-bootstrap/Form"
import Select from "react-select"
import { useState } from "react"
import TAMBON_M from "../../public/assets/json/TAMBON_M.json";
import AMPHUR_M from "../../public/assets/json/AMPHUR_M.json";
import PROVINCE_M from "../../public/assets/json/PROVINCE_M.json";
import { handleAlert } from "../../utils/global"
import { insert_users } from "../../model/Users"

const ReisterInformation = () => {

	const [ form, setForm ] = useState({
		fname : "",
		lname : "",
		nickname : "",
		age : "",
		gender : "",
		career : "",
		telephone : "",
		email : "",
		password : "",
		password_confirm : "",
		zipcode : "",
		user_status : null,
		card_id_file : "",
		wallet_id : "",
		license : "",
		garden_name : "",
		garden_location : "",
		species : "",
		price : "",
		tambon : "",
		district : "",
		province : "",
		address : "",
		date_start : "",
		date_end : "",
		area : "",
		product_amount : "",
		activity : "",
		product_other : "",
		garden_facilities : "", 
		other_facilities : "", 
		sales_channel : "",
		attraction : "",
		need_help : "",
		feedback : ""
	})

	const handleInputForm=async(e)=>{
		console.log(e.target.name)
		if (e.target.name=='zipcode') {
			handleZipcode(e.target.value)
		}
		setForm((prevState)=>({
			...prevState,
			[e.target.name] : e.target.value
		}))
	}

	const handleZipcode=async(zipcode)=>{
		console.log(zipcode)
		let tambon = TAMBON_M.filter((item, index) => {
			return item.ZIP_CODE == zipcode;
		});
		if (tambon.length > 0) {
			let amphur = AMPHUR_M.filter((item, index) => {
				return item.ID == tambon[0].AMPHUR_ID;
			});
			let province = PROVINCE_M.filter((item, index) => {
				return item.ID == tambon[0].PROVINCE_ID;
			});
			setForm((prevState) => ({
				...prevState,
				tambon: tambon[0].NAME_TH,
				district: amphur[0].NAME_TH,
				province: province[0].NAME_TH,
				address : `ตำบล ${tambon[0].NAME_TH} อำเภอ ${amphur[0].NAME_TH} จังหวัด ${province[0].NAME_TH}`
			}));
		}
	}

	const handleSave=async()=>{
		if (form.fname=='') {
			document.getElementById('fname').focus()
			handleAlert('warning','ระบุชื่อ')
		}
		else if ( form.lname=='' ) {
			document.getElementById('lname').focus()
			handleAlert('warning','ระบุนามสกุล')
		}
		else if ( form.nickname=='' ) {
			document.getElementById('nickname').focus()
			handleAlert('warning','ระบุเล่น')
		}
		else if ( form.age=='' ) {
			document.getElementById('age').focus()
			handleAlert('warning','ระบุอายุ')
		}
		else if ( form.gender=='' ) {
			document.getElementById('gender').focus()
			handleAlert('warning','ระบุเพศ')
		}
		else if ( form.career=='' ) {
			document.getElementById('career').focus()
			handleAlert('warning','ระบุอาชีพ')
		}
		else if ( form.telephone=='' ) {
			document.getElementById('telephone').focus()
			handleAlert('warning','ระบุเบอร์โทรศัพท์')
		}
		else if ( form.password=='' ) {
			document.getElementById('password').focus()
			handleAlert('warning','ระบุรหัสผ่าน')
		}
		else if ( form.password_confirm=='' ) {
			document.getElementById('password_confirm').focus()
			handleAlert('warning','ยืนยันรหัสผ่าน')
		}
		else if ( form.password!==form.password_confirm ) {
			document.getElementById('password_confirm').focus()
			handleAlert('warning','รหัสผ่านไม่ตรงกัน')
		}
		else if ( form.zipcode=='' ) {
			document.getElementById('zipcode').focus()
			handleAlert('warning','ระบุรหัสไปรษณีย์')
		}
		else if ( form.address=='' ) {
			document.getElementById('address').focus()
			handleAlert('warning','ระบุที่อยู่ของท่าน')
		}
		else if ( form.user_status=='' ) {
			handleAlert('warning','ระบุสถานะผู้สมัคร')
		}
		else if ( form.card_id_file=='' ) {
			document.getElementById('card_id_file').focus()
			handleAlert('warning','ระบุ สำเนาบัตรประชาชน (พร้อมเซนต์ สำเนาถูกต้อง)')
		}
		else if ( form.license=='' ) {
			document.getElementById('license').focus()
			handleAlert('warning','ระบุ เลขที่เอกสารสิทธิ์')
		}
		else if ( form.garden_name=='' ) {
			document.getElementById('garden_name').focus()
			handleAlert('warning','ระบุ ชื่อสวนกัญชา')
		}
		else if ( form.garden_location=='' ) {
			document.getElementById('garden_location').focus()
			handleAlert('warning','ระบุ ที่อยู่สวนกัญชา')
		}
		else if ( form.species=='' ) {
			document.getElementById('species').focus()
			handleAlert('warning','ระบุ สายพันธ์กัญชา')
		}
		else if ( form.price=='' ) {
			document.getElementById('price').focus()
			handleAlert('warning','ระบุ ราคากัญชาหน้าสวน ต่อ กิโลกรัม')
		}
		else if ( form.date_start=='' ) {
			document.getElementById('date_start').focus()
			handleAlert('warning','ระบุ ระยะเวลาเริ่มออกผลผลิต')
		}
		else if ( form.date_end=='' ) {
			document.getElementById('date_end').focus()
			handleAlert('warning','ระบุ ระยะเวลาสิ้นสุดออกผลผลิต')
		}
		else if ( form.area=='' ) {
			document.getElementById('area').focus()
			handleAlert('warning','ระบุ ขนาดพื้นที่เข้าร่วมโครงการ')
		}
		else if ( form.product_amount=='' ) {
			document.getElementById('product_amount').focus()
			handleAlert('warning','ระบุ จำนวนผลผลิตที่สามารถเข้าร่วมโครงการได้')
		}
		else if ( form.sales_channel=='' ) {
			document.getElementById('sales_channel').focus()
			handleAlert('warning','ระบุ ช่องทางการขายหลัก')
		} 

		else {
			let result_insert = await insert_users(form)
			if (result_insert.status==true) {
				handleAlert('success','ลงทะเบียนสำเร็จ')
				setInterval(() => {
					window.location.href='../signin'
				}, 1500);
			}
		}
	}


	return (
		<>
			<section className="">
				<div className="container fix-container my-md-5 my-3">
					<div className="body_detailNews pb-5">
						<div className="row layout_maininformation">
							<div className="col-12">
								<p className="header_inforReg">สมัครเข้าร่วมโครงการ</p>
								<p className="topic_inforReg">ข้อมูลทั่วไป</p>
							</div>
							<div className="col-md-6 col-12">
								<input className="layout-input_inforReg text-input_inforReg" 
								placeholder="ชื่อ" 
								name="fname"
								id="fname"
								value={form.fname}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-md-6 col-12">
								<input className="layout-input_inforReg"
								placeholder="นามสกุล"
								name="lname"
								id="lname"
								value={form.lname}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-md-6 col-12">
								<input className="layout-input_inforReg" 
								placeholder="ชื่อเล่น" 
								name="nickname"
								id="nickname"
								value={form.nickname}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-md-6 col-12 mb-2">
							<input className="layout-input_inforReg" 
							placeholder="คุณอายุเท่าไหร่" 
							type="number"
							name="age"
							id="age"
							value={form.age}
							onChange={(e)=>{handleInputForm(e)}}
							/>
								{/* <Form.Select aria-label="Default select example">
									<option>คุณอายุเท่าไหร่</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
								</Form.Select> */}
							</div>
							<div className="col-md-6 col-12 mb-2">
								<Form.Select
								name="gender"
								id="gender"
								onChange={(e)=>{handleInputForm(e)}}
								aria-label="Default select example">
									<option value={''}>เพศ</option>
									<option value="m">ชาย</option>
									<option value="g">หญิง</option>
								</Form.Select>
							</div>
							<div className="col-md-6 col-12 mb-2">
							<input className="layout-input_inforReg" 
							placeholder="อาชีพ" 
							type="text"
							name="career"
							id="career"
							value={form.career}
							onChange={(e)=>{handleInputForm(e)}}
							/>
								{/* <Form.Select aria-label="Default select example">
									<option>อาชีพ</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
								</Form.Select> */}
							</div>
							<div className="col-12 mt-4">
								<p className="topic_inforReg">ชื่อผู้ใช้และรหัสผ่าน</p>
							</div>
							<div className="col-md-6 col-12">
								<input type="tel" className="layout-input_inforReg"
								placeholder="เลขโทรศัพท์" 
								name="telephone"
								id="telephone"
								value={form.telephone}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-md-6 col-12">
								<input type="email" 
								className="layout-input_inforReg"
								placeholder="อีเมล" 
								name="email"
								id="email"
								value={form.email}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-md-6 col-12">
								<input type="password" className="layout-input_inforReg"
								placeholder="รหัสผ่าน"
								name="password"
								id="password"
								value={form.password} 
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-md-6 col-12">
								<input type="password" className="layout-input_inforReg" 
								placeholder="ใส่รหัสผ่านอีกครั้ง"
								name="password_confirm"
								id="password_confirm"
								value={form.password_confirm}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-4">
								<p className="topic_inforReg">ที่อยู่</p>
								<input type="text" className="layout-input_inforReg"
								placeholder="รหัสไปรษณย์"
								name="zipcode"
								id="zipcode"
								value={form.zipcode}
								onChange={(e)=>{handleInputForm(e)}}
								/>
								{/* <Form.Select aria-label="Default select example" className="mb-2">
									<option>จังหวัด อำเภอ ไปรษณีย์</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
								</Form.Select> */}
								<input className="layout-input_inforReg" 
								placeholder="ที่อยู่เพิ่มเติม" 
								name="address"
								id="address"
								value={form.address} 
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-4">
								<p className="topic_inforReg">สถานะผู้สมัคร</p>
								<input type="radio" className="form-check-input" name="user_status" value="1" onChange={(e)=>{handleInputForm(e)}}/>
								<label for="html" className="text-checkbox_reg mb-2">&nbsp; &nbsp;เกษตรกรที่ขึ้นทะเบียนกับกระทรวงเกษตรและสหกรณ์</label> <br />
								<input type="radio" className="form-check-input" name="user_status" value="2" onChange={(e)=>{handleInputForm(e)}}/>
								<label for="html2" className="text-checkbox_reg mb-2">&nbsp; &nbsp; เกษตรกรทั่วไป</label> <br />
								<input type="radio" className="form-check-input" name="user_status" value="3" onChange={(e)=>{handleInputForm(e)}}/>
								<label for="html3" className="text-checkbox_reg mb-2">&nbsp; &nbsp; ทายาทเกษตรกร</label> <br />
								<input type="radio" className="form-check-input"  name="user_status" value="4" onChange={(e)=>{handleInputForm(e)}}/>
								<label for="html4" className="text-checkbox_reg mb-2">&nbsp; &nbsp; แรงงานคืนถิ่น</label>
							</div>
							<div className="col-12 mt-4">
								<p className="topic_inforReg">สำเนาบัตรประชาชน (พร้อมเซนต์ สำเนาถูกต้อง)</p>
								{ form.card_id_file ?  <><span class="badge bg-light text-dark border">{form.card_id_file}</span><br/><br/></> : ''}
								<div className="upload-btn-wrapper d-flex align-items-center cursor-pointer">
									<div className="d-flex align-items-center layout_btn-upload cursor-pointer">
										<img src="../../assets/image/register/091-upload.svg" />
										<button className="btn_upload cursor-pointer">Upload file</button>
										<input type="file" 
										name="card_id_file" 
										id="card_id_file"
										value={form.card_id_file} 
										onChange={(e)=>{handleInputForm(e)}}
										accept="image/*" />
									</div>
								</div>
							</div>
							<div className="col-12  mt-4">
								<label className="topic_inforReg">Wallet address เลขกระเป๋า สำหรับรับเหรียญ (ถ้ามี)</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="เลขกระเป๋า"
								name="wallet_id"
								value={form.wallet_id}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">เลขที่เอกสารสิทธิ์</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="เลขเอกสาร" 
								name="license"
								id="license"
								value={form.license}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">ชื่อสวนกัญชา</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ใส่ชื่อ"
								name="garden_name"
								id="garden_name"
								value={form.garden_name}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
							<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ที่อยู่สวนกัญชา และ Location"
								name="garden_location"
								id="garden_location"
								value={form.garden_location}
								onChange={(e)=>{handleInputForm(e)}}
								/>
								{/* <Form.Select aria-label="Default select example">
									<option>ที่อยู่สวนกัญชา และ Location</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
								</Form.Select> */}
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">สายพันธ์กัญชา</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ใส่ชื่อสายพันธ์กัญชา" 
								name="species"
								id="species"
								value={form.species}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">ราคากัญชาหน้าสวน ต่อ กิโลกรัม</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ใส่ราคากัญชา" 
								name="price"
								id="price"
								value={form.price}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">ระยะเวลาออกผลผลิต</label>
							</div>
							<div className="col-6 mt-3">
								<label className="topic_inforReg">เริ่ม</label>
								<input type="date" 
								className="layout-input_inforReg" 
								name="date_start"
								id="date_start"
								value={form.date_start} 
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-6 mt-3">
								<label className="topic_inforReg">สิ้นสุดฤดูกาล</label>
								<input type="date" 
								className="layout-input_inforReg" 
								name="date_end" 
								id="date_end"
								value={form.date_end}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">ขนาดพื้นที่เข้าร่วมโครงการ </label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ใส่ขนาดพื้นที่"
								name="area"
								id="area"
								value={form.area}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">จำนวนผลผลิตที่สามารถเข้าร่วมโครงการได้ </label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ใส่จำนวน" 
								name="product_amount"
								id="product_amount"
								value={form.product_amount}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">กิจกรรมในสวน (อาทิ DIY workshop ศูนย์การเรียนรู้ฯ) </label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ใสกิจกรรม" 
								name="activity"
								value={form.activity}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">ผลผลิตอื่นๆภายในสวน </label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ใส่ผลผลิต" 
								name="product_other"
								id="product_other"
								value={form.product_other}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">สวนของท่านมีสิ่งอำนวยความสะดวกด้านใดบ้าง (โปรดระบุ) อาทิ ที่พัก ร้านกาแฟ </label>
								<input type="text" 
								className="layout-input_inforReg" 
								name="garden_facilities" 
								id="garden_facilities"
								value={form.garden_facilities}
								onChange={(e)=>{handleInputForm(e)}}
								placeholder="ระบุ" />
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">สิ่งอำนวยความสะดวกบริเวณใกล้เคียง (อาทิ ร้านกาแฟ ร้านอาหาร ที่พัก) โปรดระบุชื่อสถานที่</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ระบุ"
								name="other_facilities"
								id="other_facilities"
								value={form.other_facilities}
								onChange={(e)=>{handleInputForm(e)}}
								 />
							</div>
							<div className="col-12 mt-4">
								<p className="topic_inforReg">ช่องทางการขายหลัก</p>
								<input type="radio" id="html01" className="form-check-input" name="sales_channel" onChange={(e)=>{handleInputForm(e)}} value="1" />
								<label for="html01" className="text-checkbox_reg mb-2">&nbsp; &nbsp;ออนไลน์</label> <br />
								<input type="radio" id="html02" className="form-check-input" name="sales_channel" onChange={(e)=>{handleInputForm(e)}} value="2" />
								<label for="html02" className="text-checkbox_reg mb-2">&nbsp; &nbsp;ออฟไลน์</label> <br />
								<input type="radio" id="html03" className="form-check-input" name="sales_channel" onChange={(e)=>{handleInputForm(e)}} value="3" />
								<label for="html03" className="text-checkbox_reg mb-2">&nbsp; &nbsp;ขายออนไลน์และออฟไลน์ควบคู่กัน</label> <br />
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">สถานที่ท่องเที่ยวใกล้เคียงสวนกัญชา</label>
								<input type="text" className="layout-input_inforReg" 
								name="attraction" 
								id="attraction" 
								placeholder="ใส่ชื่อสถนาที่"
								value={form.attraction}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">สวนต้องการความช่วยเหลือด้านใดบ้างสำหรับเข้าร่วมโครงการ (โปรดระบุ)</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ระบุ" 
								name="need_help"
								value={form.need_help}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3">
								<label className="topic_inforReg">ข้อเสนอแนะเพิ่มเติม</label>
								<input type="text" 
								className="layout-input_inforReg" 
								placeholder="ข้อเสนอ" 
								name="feedback"
								id="feedback"
								value={form.feedback}
								onChange={(e)=>{handleInputForm(e)}}
								/>
							</div>
							<div className="col-12 mt-3 ">
								<div class="form-check d-flex justify-content-center">
									<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
									<label class="form-check-label mx-2" for="exampleRadios1">
										ข้อตกลงในการใช้งาน อ่านข้อตกลง
									</label>
								</div>
								<button className="btn btn-see-more px-5 mx-auto mt-4" onClick={handleSave}>ยืนยัน</button>
							</div>
						</div>
					</div>
				</div>
			</section>

		</>
	);
};

export default ReisterInformation
ReisterInformation.layout = Mainlayout
