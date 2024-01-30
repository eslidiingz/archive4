import { useState } from "react";
import React from "react";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Spinner from "../../components/Spinner";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);


    return (
        <>
            <section>
                <div className="container main_login">
                    <div className="row main_login">
                        <div className="col-lg-6 col-12">
                            <div className="mainlayout_loginL">
                                <div className=" d-flex align-items-center bottom_login">
                                    <img src="../assets/image/topbar/logo.svg" className="logo_login" />
                                    <p className="name-logo_topbar">SIAM CANNABIS CLINIC</p>
                                </div>
                                <p className="tittle_login" align="right">WELCOME BACK!</p>
                                <p className="tittle_login" align="right">CLINIC</p>
                                <p className="detail_login">In this early phase, 2 hectares of cultivation zone will be represented for a total of 2,000 NFT. If there is further NFT expansion, the members can expand their NFT differently according to their cannabis cultivation rights and the benefit ratio of the unit</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="mainlayout_loginR">
                                <div className="top_forgot">
                                    <p className="tittle_forgot">Forgot your Password ?</p>
                                    <p className="detail_forgot">Enter your email address below, and we'll send you an email allowing you to rest it.</p>
                                    <input type="text" className="form-control layout-input_login mb-4" placeholder="Email *" />
                                    <Button className="btn-top_login" onClick="" disabled={loading}>
                                        <p className="text-btn_modal-c">{!loading ? 'Request password reset' : <Spinner /> }</p>
                                    </Button>
                                    <Link href={"/login"}>
                                        <p className="text-sub_login" align="center">Back to 
                                        <span className="text-reg_login">Login</span>
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ForgotPassword;
