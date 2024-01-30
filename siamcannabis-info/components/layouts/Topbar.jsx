import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from "next/link";


function Topbar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-white navbar-scoll">
				<div className="container">
					<Link href={"/"}>
						<div className="d-flex align-items-center navbar-brand cursor-pointer ">
							<img src="../../assets/image/nav/logo-nav.svg"  />
							<div className="d-block">
								<p className='textmain_logo'>สยามกัญชา</p>
								<p className='textsub_logo'>Information knowledge & NFT</p>
							</div>
						</div>
					</Link>
					<div className="d-lg-block d-none">
						<div className="navbar-nav">
							{/* <a className="nav-link" aria-current="page" href="#">สมัครเข้าร่วมโครงการ</a>
							<a className="nav-link" href="#">ไปยัง Siam Cannabis</a> */}
							<Link href={"/register"}>
								<p className="text_hover nav-link" aria-current="page">สมัครเข้าร่วมโครงการ</p>
							</Link>
							<a target="_self" href={`http://siamcannabis.io`}>
								<p className="text_hover nav-link">ไปยัง Siam Cannabis.io</p>
							</a>
							<Link href={"/contact"}>
								<p className="text_hover nav-link">ติดต่อเรา</p>
							</Link>
						</div>
					</div>
					<div className="d-lg-none d-block" >
						<img src="../../assets/image/nav/icon-menu.svg" onClick={handleShow} />

					</div>
				</div>
			</nav>
			<Offcanvas show={show} onHide={handleClose} placement="top">
				<Offcanvas.Body>
					<div className="container">
						<div className="row">
							<h4 className="ci-color-yellow">เมนู</h4>
							<ul className="nav-sm-ul">
								<li>
									<a target="_self" href={`/register`}>
										<div className=" d-flex justify-content-between py-4 ci-color-yellow">
											<p className="mb-0">สมัครเข้าร่วมโครงการ</p>
											<img src="../../assets/image/nav/icon-right-arrow.svg" />
										</div>
									</a>
								</li>
								<li>
									<a target="_self" href={`http://siamcannabis.io`}>
										<div className=" d-flex justify-content-between py-4 ci-color-yellow">
											<p className="mb-0">ไปยัง Siam Cannabis<span>.io</span></p>
											<img src="../../assets/image/nav/icon-right-arrow.svg" />
										</div>
									</a>
								</li>
								<li>
									<a target="_self" href={`/contact`}>
										<div className=" d-flex justify-content-between py-4 ci-color-yellow">
											<p className="mb-0">ติดต่อเรา</p>
											<img src="../../assets/image/nav/icon-right-arrow.svg" />
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
export default Topbar
