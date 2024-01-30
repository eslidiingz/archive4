import Link from "next/link";
import ButtomDots from "../buttom/ButtomDots";


function CardProject(props) {


    return (
        <>
            <div className="layout-main_cardProject">
                <div className="row body-card_project">
                    <div className="col-5 d-lg-block d-none">
                        <img src="../assets/image/project/Rectangle215.webp" className="img-card_project" />
                        {/* <img src="/assets/image/project/sut.jpeg" className="img-card_project" /> */}
                    </div>
                    <div className="col-lg-7 col-12 mt-lg-3 layout-sec_cardProject p-0">
                        <div className="px-lg-3">
                        <ButtomDots
                            classset="btn btn-dots-green mb-3"
                            // classset="btn btn-dots-yellow mb-3"
                            // classset="btn btn-dots-red mb-3"
                            text="Running Project"
                        />
                        </div>
                        <p className="text-detail_cardProject p-3">{props.title}</p>
                        <div className="row p-3">
                            <div className="col-sm-6 mb-4 col-xs-6 px-2">
                                <div className="d-flex align-items-center">
                                    <img src="../assets/image/project/location.svg" />
                                    <p className="text-tittle_cardProject">{props.location}</p>
                                </div>
                                <p className="text-detail2_cardProject">{props.typelocation}</p>
                            </div>
                            <div className="col-sm-6 mb-4 col-xs-6 px-2">
                                <div className="d-flex align-items-center">
                                    <img src="../assets/image/project/quantity.svg" />
                                    <p className="text-tittle_cardProject">{props.quantity}</p>
                                </div>
                                <p className="text-detail2_cardProject">{props.typequantity}</p>
                            </div>
                            <div className="col-sm-6 mb-4 col-6 px-2">
                                <div className="d-flex align-items-center">
                                    <img src="../assets/image/project/holding.svg" />
                                    <p className="text-tittle_cardProject">{props.holding}</p>
                                </div>
                                <p className="text-detail2_cardProject">{props.typeholding}</p>
                            </div>
                            <div className="col-sm-6 mb-4 col-6 px-2">
                                <div className="d-flex align-items-center">
                                    <img src="../assets/image/project/profit.svg" />
                                    <p className="text-tittle_cardProject">{props.profit}</p>
                                </div>
                                <p className="text-detail2_cardProject">{props.typeprofit}</p>
                            </div>
                            <div className="col-12 col-6 px-2">
                                <div className="d-flex align-items-center">
                                    <img src="../assets/image/project/time.svg" />
                                    <p className="text-tittle_cardProject">{props.time}</p>
                                </div>
                                <p className="text-detail2_cardProject">{props.tpyetime}</p>
                            </div>
                            {!props.ready ?
                                <>
                                   
                                </>
                                :
                                <>
                                 <div className="col-12">
                                    <hr />
                                </div>
                                <div className="col-12 layout_btn-cardproject">
                                    <Link href={"/project"}>
                                    <button className="btn btn-see-more margin-auto-set-sf">
                                        อ่านรายละเอียดเพิ่มเติม
                                        <img src="../assets/image/card/047-star1.svg" className="mx-2" />
                                    </button>
                                    </Link>
                                </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CardProject;
