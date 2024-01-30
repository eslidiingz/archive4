import { useState } from "react"
import Link from "next/link"


function CardHidden(props) {

  const [isActive, setActive] = useState (false)
  const toggleHide = () => {
    setActive(!isActive);
  }

    return (
      <>
        <div className="card text-white ">
          <Link href={props.link} >
          <a className="w-full" >
            <div className=" position-relative">
              <div className="set-img-frame">
                <img className="card-img-top img-card w-100 h-100 fit-cover" src={props.img} alt="Card image"/>
              </div>
                <div className="card-cover position-absolute" ></div>
                <div className={props.hideplay}>
                  <div className="absolute-img-play">
                      <img className="card-img-top img-card " src="/assets/rsu-image/icons/play.svg" alt="Card image"/>
                  </div>
                </div>
            </div>
          </a>
          </Link>
          <div className="w-full" >
            <p className="text05 mt-2">{props.detail}</p>
            <p className="text05 mt-2" align="right">Price</p>
            <p className="text13" align="right">{props.time}</p>
            <div className="row">
              <div className="col-6 mt-2 d-flex gap-2">
                <button className="btn-none me-1" >
                  <div className="d-flex gap-1 align-items-center fav">
                    <i className="fas fa-heart layout04 icon-white"></i>
                    <p className="text14 ci-white">{props.fav}</p>
                  </div>
                </button>
                <button className="btn-none" >
                  <div className={`hide-view ${isActive ? "hide" : ""}`} onClick={toggleHide}></div>
                </button>
              </div>
              <div className="col-6 mt-2">
                <div className="d-flex gap-2 align-items-center justify-content-end pt-1">
                    <img alt="" width={13} src="/assets/rsu-image/icons/diamond.svg"/>
                    <p className="text15" align="right">{props.coin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  export default CardHidden
  