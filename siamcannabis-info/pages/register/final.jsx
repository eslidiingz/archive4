import { useEffect } from "react";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Link from "next/link";



const ReisterFinal = () => {
 
  return (
    <>
    <section className="layout_register">
      <div className="container fix-container my-md-5 my-3">
      <div className="body_detailNews">
        <div className="row">
            <div className="col-12" align="center">
            <img className="mb-5 mt-3" src="../assets/image/register/019-fireworks 1.svg" />
                <p className="text-header2_register">ขอบคุณที่สนใจร่วมโครงการกับเรา</p>
                <p className="text-detail_register">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat suntAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat suntAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt</p>
                <Link href={"/"}> 
                <div className="w-100 d-flex justify-content-center mb-3">
                    <button className="d-flex align-items-center cursor-pointer btn btn_register">
                        <p className="text-btn_register">กลับสู่หน้าแรก</p>
                        <img className="ps-2" src="../assets/image/register/Vector.svg" />
                    </button>
                </div>
                </Link>
            </div>

         </div>
    </div>
      </div>
    </section>
      
    </>
  );
};

export default ReisterFinal;
ReisterFinal.layout = Mainlayout;
