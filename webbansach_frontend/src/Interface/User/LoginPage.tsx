import React, { ChangeEvent, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import NavbarLoginRegistration from "../Header/NavbarLogin";
import { useAuthenticationContext } from "../../Authentication/AuthenticationContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [typeWrongLoginData, setTypeWringLoginData] = useState(false);
  const authenticationContext = useAuthenticationContext();
  authenticationContext.isLoggedIn === true && navigate("/home");

  function handleLogin(event: any): void {
    event.preventDefault();
    const loginRequest = loginData;

    console.log(loginRequest);

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((response) => {
        if (!response.ok) {
          // setTypeWringLoginData(true)
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        //tra về jwt
        localStorage.setItem("token", data.jwt);
        authenticationContext.setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setTypeWringLoginData(true);
      });
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "rgb(210,180,140)",
        zIndex: 9999,
      }}
    >
      <NavbarLoginRegistration
        text="Login book store"
        textInput="Tiếp tục mà không đăng nhập"
      />
      <div
        style={{
          width: "80vw",
          height: "70vh",
          margin: "5vh 10vw",
          borderRadius: "20px",
          backgroundColor: "rgb(255,248,220)",
          overflow: "hidden",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <section className="vh-100" style={{ marginTop: "8vh" }}>
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-floating mx-1"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary btn-floating mx-1"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary btn-floating mx-1"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                  </div>

                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="usernameInput"
                      className="form-control form-control-lg"
                      placeholder="Enter username"
                      value={loginData.username}
                      onChange={(event) => {
                        setLoginData((prev) => ({
                          ...prev,
                          username: event.target.value,
                        }));
                      }}
                    />
                    <label className="form-label" htmlFor="usernameInput">
                      Email address
                    </label>
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="passwordInput"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      value={loginData.password}
                      onChange={(event) => {
                        setLoginData((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }));
                      }}
                    />
                    <label className="form-label" htmlFor="passwordInput">
                      Password
                    </label>
                    <br />
                    {typeWrongLoginData && (
                      <span style={{ color: "red" }}>
                        Account or password is incorrect
                      </span>
                    )}
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">
                      Forgot password?
                    </a>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <Link to="/registrationpage" className="link-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary"
            style={{ borderRadius: "10px" }}
          >
            {/* Copyright */}
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2020. All rights reserved.
            </div>
            {/* Right */}
            <div>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="#!" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
