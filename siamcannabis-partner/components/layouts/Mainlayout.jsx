import Link from "next/link";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Mainlayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [toggleViewMode, setToggleViewMode] = useState(false);

  const initialize = async () => {};

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      initialize();
    }
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <div className="main-layout position-relative ">
          <Topbar />
          <div className="layout-wrapper">
            <div className="sidebar d-lg-block d-none">
              <Sidebar />
            </div>
            <div className="content">{children}</div>
          </div>
          {/* <Footer/> */}
        </div>
      </>
    );
}

export default Mainlayout;
