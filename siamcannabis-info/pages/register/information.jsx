import Mainlayout from "/components/layouts/Mainlayout"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Form from "react-bootstrap/Form"

import {
	handleAlert,
	saveUploadFile,
	delUploadFile,
	getUploadFile
} from "/utils/global"

import {
	insert_users
} from "/model/Users"

import TAMBON_M from "../../public/assets/json/TAMBON_M.json"
import AMPHUR_M from "../../public/assets/json/AMPHUR_M.json"
import PROVINCE_M from "../../public/assets/json/PROVINCE_M.json"

const ReisterInformation = () => {

	const [files, setFiles] = useState({
		license: {
			file: null,
			preview: null
		}
	});

	const [form, setForm] = useState({

		// USER INFO
		firstname: "",
		lastname: "",
		nickname: "",
		age: 30,
		gender: "",
		career: "",
		telephone: "",
		line_id: "",
		email: "",
		// USER INFO END

		// LICENSE INFO
		license_number: "",
		license_file: "",
		// LICENSE INFO END

		// FARM INFO
		farm_name: "",
		zipcode: "",
		district: "",
		province: "",
		address: "",
		species: "",
		price: 1,
		harvest_times: 1,
		harvest_dates: [
			{
				date_start: "",
				date_end: ""
			}
		],
		area_size: 1,
		product_amount: 1,
		farm_activity: "",
		product_other: "",
		// FARM INFO END

		is_agreed: false,

	})
	const handleFormChange = (event) => {
		if(event.target.type == "checkbox"){
			setForm((prevState) => ({
				...prevState,
				[event.target.name]: event.target.checked
			}));
		}else{
			setForm((prevState) => ({
				...prevState,
				[event.target.name]: event.target.value
			}));
		}
	}

	const handleHarvestTimes = (event) => {

		let a = []

		for( var i = 0; i < event.target.value; i++ ){
			a.push({
				date_start: form.harvest_dates[i]?.date_start ? form.harvest_dates[i]?.date_start : "",
				date_end: form.harvest_dates[i]?.date_end ? form.harvest_dates[i]?.date_end : ""
			})
		}

		setForm((prevState) => ({ ...prevState, harvest_dates: [] }));
		setForm((prevState) => ({ ...prevState, harvest_dates: a }));

	}
	const handleHarvestDates = (event, index) => {
		let a = [...form.harvest_dates]
		a[index][event.target.name] = event.target.value
		setForm((prevState) => ({ ...prevState, harvest_dates: [] }));
		setForm((prevState) => ({ ...prevState, harvest_dates: a }));
	}

	const handleZipcode = async (zipcode) => {
		let tambon = TAMBON_M.filter((item, index) => {
			return item.ZIP_CODE == zipcode
		})
		if (tambon.length > 0) {
			let amphur = AMPHUR_M.filter((item, index) => {
				return item.ID == tambon[0].AMPHUR_ID
			})
			let province = PROVINCE_M.filter((item, index) => {
				return item.ID == tambon[0].PROVINCE_ID
			})
			setForm((prevState) => ({
				...prevState,
				tambon: tambon[0].NAME_TH,
				district: amphur[0].NAME_TH,
				province: province[0].NAME_TH,
				address: `ตำบล ${tambon[0].NAME_TH} อำเภอ ${amphur[0].NAME_TH} จังหวัด ${province[0].NAME_TH}`,
			}))
		}
	}

	const handleFileChange = async (event) => {

		for (let file of Array.from(event.target.files)) {

			let fileSize = file.size / 1024 / 1024
			if (fileSize > 4.0) {

				await Swal.fire({
					icon: "warning",
					title: "ไฟล์รูปต้องไม่เกิน 4 MB",
					confirmButtonColor: "#fb46a9"
				})

				return false;

			}

			let fileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.addEventListener("load", function () {

				let fileWithPreview = {
					file: file,
					preview: this.result
				}

				setFiles((prevState) => ({
					...prevState,
					[event.target.name]: fileWithPreview,
				}))

			});

		}

	}

	const handleSubmit = async (event) => {

		event.preventDefault();

		if( files.license.file ){

			const resSave = await saveUploadFile([files.license.file]);
			if (resSave instanceof Error) throw new Error(`resSave error ${resSave.message}`);

			form.license_file = resSave

		}

		let res = await insert_users(form)
		if( res.ok ){
			handleAlert("success", "ลงทะเบียนสำเร็จ")
			setInterval(() => {
				window.location.href = "/register/final"
			}, 1500)
		}else{
			handleAlert("error", "บันทึกไม่สำเร็จ กรุณาตรวจดูความถูกต้องของฟอร์มอีกครั้ง")
		}

	}

	return (
		<>
			<section className="">
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="container fix-container my-md-5 my-3">
						<div className="body_detailNews pb-5">
							<div className="row layout_maininformation">

								<div className="col-12">
									<p className="header_inforReg">
										สมัครเข้าร่วมโครงการ
									</p>
								</div>

								{/* USER INFO */}
								<div className="col-12">
									<p className="section_inforReg bb">
										ข้อมูลผู้สมัคร
									</p>
								</div>
								<div className="col-12">
									<p className="topic_inforReg">
										ข้อมูลทั่วไป
									</p>
								</div>
								<div className="col-md-6 col-12">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="ชื่อ"
										name="firstname" value={form.firstname}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-md-6 col-12">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="นามสกุล"
										name="lastname" value={form.lastname}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-md-6 col-12">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="ชื่อเล่น"
										name="nickname" value={form.nickname}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-md-6 col-12 mb-2">
									<input type="number"
										className="layout-input_inforReg"
										placeholder="คุณอายุเท่าไหร่"
										name="age" value={form.age}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-md-6 col-12 mb-2">
									<Form.Select
										name="gender" value={form.gender}
										onChange={(e) => { handleFormChange(e) }}
									>
										<option value="">เลือกเพศ</option>
										<option value="male">ชาย</option>
										<option value="female">หญิง</option>
									</Form.Select>
								</div>
								<div className="col-md-6 col-12 mb-2">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="อาชีพ"
										name="career" value={form.career}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<p className="topic_inforReg">
										ข้อมูลการติดต่อ
									</p>
								</div>
								<div className="col-md-6 col-12">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="เบอร์โทรศัพท์"
										name="telephone" value={form.telephone}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-md-6 col-12">
									<div style={{ position: "relative" }}>
										<img
											className="icon-img_contact"
											src="/assets/image/footer/Line.png"
											style={{
												position: "absolute",
												right: "15px", top: "15px"
											}}
										/>
										<input type="text"
											className="layout-input_inforReg"
											placeholder="ไลน์ไอดี"
											name="line_id" value={form.line_id}
											onChange={(e) => { handleFormChange(e) }}
										/>
									</div>
								</div>
								<div className="col-12">
									<input type="email"
										className="layout-input_inforReg"
										placeholder="อีเมล"
										name="email" value={form.email}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								{/* USER INFO END */}

								{/* LICENSE INFO */}
								<div className="col-12">
									<p className="section_inforReg bb">
										ข้อมูลเอกสารสิทธิ์ (ถ้ามี)
									</p>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										เลขที่เอกสารสิทธิ์
									</label>
									<input type="text"
										className="layout-input_inforReg"
										placeholder="เลขเอกสาร"
										name="license_number" value={form.license_number}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<p className="topic_inforReg">
										รูปภาพเอกสารสิทธิ์
									</p>
									<div className="upload-btn-wrapper d-flex align-items-center cursor-pointer">
										<div className="d-flex align-items-center layout_btn-upload cursor-pointer">
											<img src="/assets/image/register/091-upload.svg" />
											<button className="btn_upload cursor-pointer">
												Upload file
											</button>
											<input type="file"
												name="license"
												onChange={(e) => { handleFileChange(e) }}
												accept="image/*"
											/>
										</div>
									</div>
									{(files.license.preview) &&
										<img
											className="mt-4"
											src={files.license.preview}
											style={{ maxHeight: "150px", borderRadius: "8px" }}
										/>
									}
								</div>
								{/* LICENSE INFO END */}

								{/* FARM INFO */}
								<div className="col-12">
									<p className="section_inforReg bb">
										ข้อมูลฟาร์ม (ถ้ามี)
									</p>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										ชื่อสวนกัญชา
									</label>
									<input type="text"
										className="layout-input_inforReg"
										placeholder="ใส่ชื่อ"
										name="farm_name" value={form.farm_name}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<p className="topic_inforReg">
										ที่อยู่ฟาร์ม
									</p>
									<input type="text"
										className="layout-input_inforReg"
										placeholder="รหัสไปรษณย์"
										name="zipcode" value={form.zipcode}
										onChange={(e) => {
											handleFormChange(e);
											handleZipcode(e.target.value);
										}}
									/>
								</div>
								<div className="col-6">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="อำเภอ"
										name="district" value={form.district}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-6">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="อำเภอ"
										name="province" value={form.province}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<input type="text"
										className="layout-input_inforReg"
										placeholder="ที่อยู่เพิ่มเติม"
										name="address" value={form.address}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										สายพันธ์กัญชา
									</label>
									<input type="text"
										className="layout-input_inforReg"
										placeholder="ใส่ชื่อสายพันธ์กัญชา"
										name="species" value={form.species}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										ราคากัญชาหน้าสวน ต่อ กิโลกรัม (บาท)
									</label>
									<input type="number"
										className="layout-input_inforReg"
										placeholder="ใส่ราคากัญชา"
										name="price" value={form.price}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										จำนวนครั้งการเก็บเกี่ยว
									</label>
									<input type="number"
										className="layout-input_inforReg"
										placeholder="ใส่จำนวนครั้ง"
										name="harvest_times" value={form.harvest_times}
										onChange={(e) => {
											handleFormChange(e);
											handleHarvestTimes(e);
										}}
									/>
								</div>
								<div className="col-12">
									{form.harvest_dates.map((item, index) => (
										<div key={index} className="row">
											<div className="col-6">
												<label className="topic_inforReg">
													เริ่มเก็บเกี่ยว
												</label>
												<input type="date"
													className="layout-input_inforReg"
													name="date_start" value={item.date_start}
													onChange={(e) => { handleHarvestDates(e,index) }}
												/>
											</div>
											<div className="col-6">
												<label className="topic_inforReg">
													สิ้นสุดฤดูกาล
												</label>
												<input type="date"
													className="layout-input_inforReg"
													name="date_end" value={item.date_end}
													onChange={(e) => { handleHarvestDates(e,index) }}
												/>
											</div>
										</div>
									))}
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										ขนาดพื้นที่เข้าร่วมโครงการ (ไร่)
									</label>
									<input type="number"
										className="layout-input_inforReg"
										placeholder="ใส่ขนาดพื้นที่ (ไร่)"
										name="area_size" value={form.area_size}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										จำนวนผลผลิตที่สามารถเข้าร่วมโครงการได้ (กิโลกรัม)
									</label>
									<input type="number"
										className="layout-input_inforReg"
										placeholder="ใส่จำนวน (กิโลกรัม)"
										name="product_amount" value={form.product_amount}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										กิจกรรมในสวน (อาทิ DIY workshop ศูนย์การเรียนรู้ฯ)
									</label>
									<input type="text"
										className="layout-input_inforReg"
										placeholder="ใสกิจกรรม"
										name="farm_activity" value={form.activity}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								<div className="col-12">
									<label className="topic_inforReg">
										ผลผลิตอื่นๆภายในสวน
									</label>
									<input type="text"
										className="layout-input_inforReg"
										placeholder="ใส่ผลผลิต"
										name="product_other" value={form.product_other}
										onChange={(e) => { handleFormChange(e) }}
									/>
								</div>
								{/* FARM INFO END */}

								<div className="col-12">

									<div className="form-check d-flex justify-content-center">
										<input id="is_agreed" type="checkbox"
											className="form-check-input"
											name="is_agreed" value={form.is_agreed} checked={form.is_agreed}
											onChange={(e) => { handleFormChange(e) }}
										/>
										<label htmlFor="is_agreed" className="form-check-label mx-2 mt-1">
											ข้อตกลงในการใช้งาน อ่านข้อตกลง
										</label>
									</div>

									<button
										type="submit"
										className="btn btn-see-more px-5 mx-auto mt-4"
										disabled={!form.is_agreed}
									>
										{form.is_agreed}
										ยืนยัน
									</button>

								</div>
							</div>
						</div>
					</div>
				</form>
			</section>
		</>
	)
}

export default ReisterInformation
ReisterInformation.layout = Mainlayout
