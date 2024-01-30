import Mainlayout from "/components/layouts/Mainlayout"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { hash, compare } from "bcryptjs"
import Form from "react-bootstrap/Form"
import Select from "react-select"

import { gqlMutation, gqlQuery } from "/db/gql"

const ReisterInformation = () => {

	const { data: session, status } = useSession()

	const [form, setForm] = useState({
		email: "test@gmail.com",
		password: "12345",
		message: "",
	})
	const handleInputChange = (event) => {
		if (event.target.type == "checkbox") {
			setForm((prevState) => ({
				...prevState,
				[event.target.name]: event.target.checked,
			}))
		} else {
			setForm((prevState) => ({
				...prevState,
				[event.target.name]: event.target.value,
			}))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		setForm((prevState) => ({
			...prevState,
			message: "",
		}));

		let query;
		let res;

		query = `
			users(
				where: {
					_or: [
						{ email: {_eq: "${form.email}"} },
						{ telephone: {_eq: "${form.email}"} }
					]
				}
			) {
				id,
				email,
				password,
				firstname,
				lastname
			}
		`;
		res = await gqlQuery(query);

		if (!res.status || res.data.length == 0) {
			setForm((prevState) => ({
				...prevState,
				message: "ไม่พบชื่อผู้ใช้นี้ในระบบ",
			}));
			return 0;
		}

		let isValid = await compare(form.password, res.data[0].password);
		if (!isValid) {
			setForm((prevState) => ({
				...prevState,
				message: "รหัสผ่านไม่ถูกต้อง",
			}));
			return 0;
		}

		signIn("Siamcannabis", {
			username: form.email,
			password: form.password,
		});
	};

	useEffect(() => {
		console.log("%c === session ", "color: yellow", session)
	}, [session])

	return (
		<>
			<section>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="container fix-container my-md-5 my-3">
						<div className="body_detailNews pb-5">
							<div className="row layout_maininformation">
								<div className="col-12">
									<p className="header_inforReg">เข้าสู่ระบบ</p>
								</div>
								<div className="col-12 mt-4">
									<p className="topic_inforReg">ชื่อผู้ใช้และรหัสผ่าน</p>
								</div>
								<div className="col-12">
									<input
										type="tel"
										className="layout-input_inforReg"
										placeholder="เบอร์โทรศัพท์หรืออีเมลล์"
										name="email"
										value={form.email}
										onChange={handleInputChange}
									/>
								</div>
								<div className="col-12">
									<input
										type="password"
										className="layout-input_inforReg"
										placeholder="รหัสผ่าน"
										name="password"
										value={form.password}
										onChange={handleInputChange}
									/>
								</div>
								<div className="col-12">
									<button class="d-flex align-items-center cursor-pointer btn btn_register">
										<p class="text-btn_register">เข้าสู่ระบบ</p>
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
