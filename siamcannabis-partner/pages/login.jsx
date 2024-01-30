import Link from "next/link";
import Button from "react-bootstrap/Button";
// import Spinner from "../../components/Spinner";

import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { getPartners } from "/models/Partner";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSession, signIn } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);

  const handleInputChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    /** Validated */
    if (!form.username.trim() || !form.password.trim()) {
      setTimeout(() => {
        Swal.fire("Failed", "Username or Password is invalid.", "error");
        setIsLoading(false);
      }, 500);
      return;
    }

    /** Partner data is exist check */
    let partner = (await getPartners(`{username: {_eq: "${form.username}"}}`))
      .data;

    if (partner.length < 1) {
      Swal.fire("Failed", "Username not found.", "error");
      setIsLoading(false);
      return;
    }

    /** Authorization check */
    const isAuthenSuccess = await bcrypt.compare(
      form.password,
      partner[0].password
    );

    if (!isAuthenSuccess) {
      Swal.fire("Failed", "Password is invalid.", "error");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    /** Call to next auth signin */
    signIn("cnb", form);
  };

  useEffect(() => {
    console.log("session", session);
  }, [session]);

  return (
    <>
      <section>
        <div className="container main_login">
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
              <form onSubmit={handleSubmit}>
                <div className="mainlayout_loginR">
                  <div className="top_login">
                    <p className="tittle_login mb-lg-5 mb-3">LOGIN!</p>
                    <input
                      type="text"
                      className="form-control layout-input_login"
                      placeholder="USERNAME *"
                      name="username"
                      id="username"
                      onChange={handleInputChange}
                    />
                    <input
                      type="password"
                      className="form-control layout-input_login"
                      placeholder="PASSWORD *"
                      name="password"
                      id="password"
                      onChange={handleInputChange}
                    />
                    <Link href={"#"}>
                      <p className="text-sub_login">Forgot your password?</p>
                    </Link>
                    <Button
                      className="btn-top_login"
                      type="submit"
                      disabled={loading}
                    >
                      <p className="text-btn_modal-c">
                        {!loading ? "LOGIN" : "Spinner"}
                      </p>
                    </Button>
                    <Link href={"/register"}>
                      <p className="text-sub_login" align="center">
                        Don’t have an account?
                        <span className="text-reg_login">Register</span>
                      </p>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
