import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  const [isActive, setActive] = useState(false);
  const toggleMode = () => {
    setActive(!isActive);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="sidebar-menu">
        <div className="col-12 mb-5 d-sm-none d-flex justify-content-center">
          <div className=" d-flex align-items-center ">
            <img src="../assets/image/topbar/logo.svg" />
            <p className="tittle-logo_topbar">SIAM CANNABIS CLINIC</p>
          </div>
        </div>
        <div className="col-12 mb-5">
          <p className="text-topic_sidebar">Clinic</p>
          <Link href="/">
            <p
              className={`text-menu_sidebar ${
                router.pathname == "/" ? "active" : ""
              }`}
            >
              Coupon Lists
            </p>
          </Link>
        </div>
        <div className="col-12">
          <p className="text-topic_sidebar">Admin</p>
          <p className="text-menu-topic_sidebar">Coupon Management</p>
          <ul>
            <li>
              <Link href="/admin/project">
                <p
                  className={`text-menuSub_sidebar ${
                    router.pathname == "/admin/project" ? "active" : ""
                  }`}
                >
                  Project
                </p>
              </Link>
            </li>
            <li>
              <Link href="//admin/zone">
                <p className={`text-menuSub_sidebar ${router.pathname == "/admin/zone" ? "active" : ""}`}>Zone</p>
              </Link>
            </li>
            <li>
              <Link href="/">
                <p
                  className={`text-menuSub_sidebar ${
                    router.pathname == "#" ? "active" : ""
                  }`}
                >
                  User (Clinic)
                </p>
              </Link>
            </li>
            <li>
              <Link href="/admin/vouchers">
                <p
                  className={`text-menuSub_sidebar ${
                    router.pathname == "/admin/vouchers" ? "active" : ""
                  }`}
                >
                  Vouchers
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
