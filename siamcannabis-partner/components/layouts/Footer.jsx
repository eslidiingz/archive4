import Link from "next/link";

function Footer() {
  function scrollMe() {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  return (
    <>
      <footer>
        <div className="container py-2">
          <div className="row mt-3">
            <div className="col-lg-4 col-12  d-lg-flex align-items-center justify-content-start d-none">
              <div className="d-flex align-items-center">
                <p className="w-100 ci-color-yellow">
                  Contact us
                </p>
                <div className=" w-100 ">
                  <ul className="mb-0 style-none">
                    <li>
                      <Link href={""}>
                        <i className="fab fa-facebook-f icon-social_footer icon-facebook_footer"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={""}>
                        <i className="fab fa-facebook-messenger icon-social_footer icon-ms-facebook_footer"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={""}>
                        <i className="fab fa-line icon-social_footer icon-ms-line_footer"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={""}>
                        <i className="fab fa-youtube icon-social_footer icon-youtube_footer mx-0"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-6 d-flex justify-content-lg-center justify-content-start ">
              <Link href={"/"}>
                <div className="d-flex align-items-center navbar-brand cursor-pointer ">
                  <img src="../../assets/image/nav/logo-nav.svg"  />
                  <div className="d-block">
                    <p className='textmain_logo'>Cannabis</p>
                    <p className='textsub_logo'>Information knowledge & NFT</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-6 d-flex justify-content-end">
              <div className="d-flex align-items-center cursor-pointer" onClick={scrollMe}>
                <p className="ci-color-yellow d-lg-block d-none">Back to top</p>
                  <i className="fal fa-angle-up ci-color-yellow px-2 f-25 d-lg-block d-none"></i>
                  <div className="d-lg-none d-flex layout-btn-backtotop_mobile">
                    <i className="fal fa-angle-up icon-backtotop_mobile px-2 "></i>
                  </div>
              </div>
            </div>
            <div className="col-12 d-lg-none d-flex mt-4">
                <p className="w-100 ci-color-yellow d-flex justify-content-center">
                  Contact us
                </p>
            </div>
            <div className="col-12 d-lg-none d-flex mt-2">
                <div className="w-100 d-flex justify-content-center">
                  <ul className="mb-0 style-none p-0">
                    <li>
                      <Link href={""}>
                        <i className="fab fa-facebook-f icon-social_footer icon-facebook_footer"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={""}>
                        <i className="fab fa-facebook-messenger icon-social_footer icon-ms-facebook_footer"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={""}>
                        <i className="fab fa-line icon-social_footer icon-ms-line_footer"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={""}>
                        <i className="fab fa-youtube icon-social_footer icon-youtube_footer mx-0"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer
