import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
// import Spinner from "../../components/Spinner";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    company_name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    accept: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    company_name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    accept: "",
  });

  const register = async () => {
    if (validated()) {
      let _data = form;

      _data.password = bcrypt.hashSync(_data.password);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(_data),
      });

      const registered = await res.json();

      if (registered.status) {
        Swal.fire(
          "Success",
          "Register success, \nPlease waiting admin approve.",
          "success"
        );
      } else {
        Swal.fire(
          "Error",
          "This username already registered, \nPlease waiting admin approve.",
          "error"
        );
      }
    }
  };

  const validated = () => {
    let status = true;

    Object.entries(errors).map((err) => {
      let key = err[0];
      let val = err[1];

      let msg;

      if (form[key].length < 1) {
        msg = `This ${key} field is required.`;
        status = false;
      } else {
        msg = "";
      }

      setErrors((prevErr) => ({
        ...prevErr,
        [key]: msg,
      }));
    });

    return status;
  };

  const onInputChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAcceptPolicy = (e) => {
    if (e.target.checked) {
      setErrors((prevErr) => ({
        ...prevErr,
        accept: "",
      }));

      setForm((prevForm) => ({
        ...prevForm,
        accept: e.target.checked,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        accept: "",
      }));
    }
  };

  const initialize = async () => {};

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <section>
        <div className="container main_login reg">
          <div className="row main_login">
            <div className="col-lg-6 col-12">
              <div className="mainlayout_loginL">
                <div className=" d-flex align-items-center bottom_login">
                  <img
                    src="../assets/image/topbar/logo.svg"
                    className="logo_login"
                  />
                  <p className="name-logo_topbar">SIAM CANNABIS CLINIC</p>
                </div>
                <p className="tittle_login" align="right">
                  WELCOME BACK!
                </p>
                <p className="tittle_login" align="right">
                  CLINIC
                </p>
                <p className="detail_login">
                  In this early phase, 2 hectares of cultivation zone will be
                  represented for a total of 2,000 NFT. If there is further NFT
                  expansion, the members can expand their NFT differently
                  according to their cannabis cultivation rights and the benefit
                  ratio of the unit
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="mainlayout_loginR">
                <p className="tittle_login mt-lg-2 mb-lg-3 mb-3">REGISTER</p>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className={`form-control layout-input_login ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    placeholder="USERNAME *"
                    name="username"
                    onChange={(e) => onInputChange(e)}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <input
                    type="password"
                    className={`form-control layout-input_login ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="PASSWORD *"
                    name="password"
                    onChange={(e) => onInputChange(e)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <input
                    type="text"
                    className={`form-control layout-input_login ${
                      errors.company_name ? "is-invalid" : ""
                    }`}
                    placeholder="COMPANY NAME *"
                    name="company_name"
                    onChange={(e) => onInputChange(e)}
                  />
                  {errors.company_name && (
                    <div class="invalid-feedback">{errors.company_name}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <input
                    type="email"
                    className={`form-control layout-input_login ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="EMAIL *"
                    name="email"
                    onChange={(e) => onInputChange(e)}
                  />
                  {errors.email && (
                    <div class="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <input
                    type="text"
                    className={`form-control layout-input_login ${
                      errors.contact_name ? "is-invalid" : ""
                    }`}
                    placeholder="CONTACT NAME *"
                    name="contact_name"
                    onChange={(e) => onInputChange(e)}
                  />
                  {errors.contact_name && (
                    <div class="invalid-feedback">{errors.contact_name}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <input
                    type="number"
                    className={`form-control layout-input_login ${
                      errors.phone_number ? "is-invalid" : ""
                    }`}
                    placeholder="PHONE NUMBER *"
                    name="phone_number"
                    onChange={(e) => onInputChange(e)}
                  />
                  {errors.phone_number && (
                    <div className="invalid-feedback">
                      {errors.phone_number}
                    </div>
                  )}
                </div>

                <input
                  type="checkbox"
                  className={`form-check-input mt-3 ${
                    errors.accept ? "is-invalid" : ""
                  }`}
                  name="user_status"
                  value="accept"
                  onChange={(e) => handleAcceptPolicy(e)}
                />
                <label for="html" className="text-radio_reg">
                  &nbsp; &nbsp;ข้อตกลงในการใช้งาน
                  <u>อ่านข้อตกลง</u>
                </label>

                <Button
                  className="btn-top_login"
                  onClick={register}
                  disabled={loading}
                >
                  <p className="text-btn_modal-c">
                    {!loading ? "Register" : "Spinner"}
                  </p>
                </Button>
                <Link href={"/login"}>
                  <p className="text-sub_login" align="center">
                    Already have an account?
                    <span className="text-reg_login">LOGIN</span>
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

export default Register;
