import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Dropdown } from "react-bootstrap";
import Link from "next/link";
import Sidebar from "./Sidebar";

import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

function Topbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSignOut = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Do you want to Sign Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };

  return (
    <>
      <div className="navbar bg_topbar">
        <Button
          className="d-lg-none d-block btn-Offcanvas-sm "
          onClick={handleShow}
        >
          <i className="fas fa-ellipsis-v"></i>
        </Button>
        <Link href="/">
          <div className=" d-flex align-items-center d-sm-flex d-none">
            <img src="../assets/image/topbar/logo.svg" />
            <p className="tittle-logo_topbar">SIAM CANNABIS CLINIC</p>
          </div>
        </Link>

        <div className="navbar-right ps-0 ps-lg-4">
          <div className="d-flex align-items-center justify-content-sm-end cursor-pointer ">
            <img
              src="../assets/image/topbar/img_user.svg"
              className="imgUser-topbar"
            />
            <div className="d-block">
              <p className="text-user_topbar">Firstname Lastname</p>
              <p className="text-user-sub_topbar">Clinic</p>
            </div>
            <a onClick={onSignOut} role="button" className="ms-3">
              <i className="fa fa-sign-out-alt text-white hover:text-gray-400"></i>
            </a>
          </div>
        </div>

        <Offcanvas
          className="ci-bg-green"
          show={show}
          onHide={handleClose}
          placement="start"
        >
          <Offcanvas.Header
            closeButton
            className="set-btn-close"
          ></Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
export default Topbar;
