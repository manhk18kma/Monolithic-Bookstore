import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";

import NavbarLoginRegistration from "../Header/NavbarLogin";
import CakeIcon from "@mui/icons-material/Cake";
import {
  validateConfirmPassword,
  validateGmailEmail,
  validateNgaySinh,
  validatePassword,
  validateTen,
  validateUsername,
} from "./Validator";
import { useNavigate } from "react-router-dom";
import MyOTPInput from "./OTPPage";
import CircularIndeterminate from "../../Authentication/CircularProcess";
const RegistrationPage = () => {
  const [renderOTP, setRenderOTP] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
    name: "",
    dateOfBirth: "",
  });

  const [userDataError, setUserDataError] = useState({
    usernameError: {
      check: false as boolean,
      text: "",
    },
    passwordError: {
      check: false as boolean,
      text: "",
    },
    repeatPasswordError: {
      check: false as boolean,
      text: "",
    },
    emailError: {
      check: false as boolean,
      text: "",
    },
    nameError: {
      check: false as boolean,
      text: "",
    },
    dateOfBirthError: {
      check: false as boolean,
      text: "",
    },
  });
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: any) {
    event.preventDefault();
    setLoading(true); // Bắt đầu hiển thị loading indicator

    // Kiểm tra lỗi dữ liệu
    for (const key in userDataError) {
      if (userDataError.hasOwnProperty(key)) {
        if (!userDataError[key as keyof typeof userDataError].check) {
          alert("Vui Lòng Nhập Thông Tin Chính Xác Và Đầy Đủ");
          setLoading(false); // Dừng hiển thị loading indicator
          return;
        }
      }
    }

    try {
      // Gửi yêu cầu đăng ký bằng phương thức POST
      const response = await fetch("http://localhost:8080/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again later.");
      }
      alert("Đã đăng ký thành công vui lòng xác thực tài khoản!");
      setRenderOTP(true);
    } catch (error: any) {
      console.error("Registration error:", error.message);
    } finally {
      setLoading(false); // Dừng hiển thị loading indicator sau khi hoàn thành yêu cầu
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "auto",
        overflow: "hidden",
        backgroundColor: "rgb(210,180,140)",
        zIndex: 9999,
      }}
    >
      <NavbarLoginRegistration
        text="Register book store"
        textInput="Tiếp tục mà không đăng nhập"
      />

      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{
                  borderRadius: "25px",
                  backgroundColor: "rgb(255,248,220)",
                }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt--1">
                        Sign up
                      </p>
                      {renderOTP ? (
                        <div style={{ marginBottom: "4.7vh" }}>
                          <MyOTPInput email={userData.email} />
                        </div>
                      ) : (
                        <form className="mx-1 mx-md-4">
                          {/* Username */}
                          <div style={{ marginLeft: "2.3vw" }}>
                            {!userDataError.usernameError.check ? (
                              <div className="text-danger ">
                                {userDataError.usernameError.text}
                              </div>
                            ) : (
                              <div className="text-success">
                                {userDataError.usernameError.text}
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                value={userData.username}
                                onChange={(event) =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    username: event.target.value,
                                  }))
                                }
                                onBlur={() => {
                                  validateUsername(userData.username).then(
                                    (data) => {
                                      setUserDataError((prev) => ({
                                        ...prev,
                                        usernameError: data,
                                      }));
                                    },
                                  );
                                }}
                                onInput={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    usernameError: {
                                      check: true,
                                      text: "",
                                    },
                                  }));
                                }}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1c"
                              >
                                Username
                              </label>
                            </div>
                          </div>

                          {/* Password */}
                          <div style={{ marginLeft: "2.3vw" }}>
                            {!userDataError.passwordError.check ? (
                              <div className="text-danger ">
                                {userDataError.passwordError.text}
                              </div>
                            ) : (
                              <div className="text-success">
                                {userDataError.passwordError.text}
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                value={userData.password}
                                onChange={(event) =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    password: event.target.value,
                                  }))
                                }
                                onBlur={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    passwordError: validatePassword(
                                      userData.password,
                                    ),
                                    repeatPasswordError:
                                      validateConfirmPassword(
                                        userData.password,
                                        userData.repeatPassword,
                                      ),
                                  }));
                                }}
                                onInput={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    passwordError: {
                                      check: true,
                                      text: "",
                                    },
                                  }));
                                }}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4c"
                              >
                                Password
                              </label>
                            </div>
                          </div>

                          {/* Repeat password */}
                          <div style={{ marginLeft: "2.3vw" }}>
                            {!userDataError.repeatPasswordError.check ? (
                              <div className="text-danger ">
                                {userDataError.repeatPasswordError.text}
                              </div>
                            ) : (
                              <div className="text-success">
                                {userDataError.repeatPasswordError.text}
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4cd"
                                className="form-control"
                                value={userData.repeatPassword}
                                onChange={(event) =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    repeatPassword: event.target.value,
                                  }))
                                }
                                onBlur={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    repeatPasswordError:
                                      validateConfirmPassword(
                                        userData.password,
                                        userData.repeatPassword,
                                      ),
                                  }));
                                }}
                                onInput={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    repeatPasswordError: {
                                      check: true,
                                      text: "",
                                    },
                                  }));
                                }}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4cd"
                              >
                                Repeat your password
                              </label>
                            </div>
                          </div>

                          {/* Email */}
                          <div style={{ marginLeft: "2.3vw" }}>
                            {!userDataError.emailError.check ? (
                              <div className="text-danger ">
                                {userDataError.emailError.text}
                              </div>
                            ) : (
                              <div className="text-success">
                                {userDataError.emailError.text}
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                value={userData.email}
                                onChange={(event) =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    email: event.target.value,
                                  }))
                                }
                                onBlur={() => {
                                  validateGmailEmail(userData.email).then(
                                    (data) => {
                                      setUserDataError((prev) => ({
                                        ...prev,
                                        emailError: data,
                                      }));
                                    },
                                  );
                                }}
                                onInput={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    emailError: {
                                      check: true,
                                      text: "",
                                    },
                                  }));
                                }}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example3c"
                              >
                                Your Email
                              </label>
                            </div>
                          </div>
                          {/* Name */}
                          <div style={{ marginLeft: "2.3vw" }}>
                            {!userDataError.nameError.check ? (
                              <div className="text-danger ">
                                {userDataError.nameError.text}
                              </div>
                            ) : (
                              <div className="text-success">
                                {userDataError.nameError.text}
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={userData.name}
                                onChange={(event) =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    name: event.target.value,
                                  }))
                                }
                                onBlur={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    nameError: validateTen(userData.name),
                                  }));
                                }}
                                onInput={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    nameError: {
                                      check: true,
                                      text: "",
                                    },
                                  }));
                                }}
                              />
                              <label className="form-label" htmlFor="name">
                                Your name
                              </label>
                            </div>
                          </div>

                          {/* Date of birth */}
                          <div style={{ marginLeft: "2.3vw" }}>
                            {!userDataError.dateOfBirthError.check ? (
                              <div className="text-danger ">
                                {userDataError.dateOfBirthError.text}
                              </div>
                            ) : (
                              <div className="text-success">
                                {userDataError.dateOfBirthError.text}
                              </div>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                            <CakeIcon className="fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="date"
                                className="form-control"
                                name="ngayThangNamSinh"
                                id="ngayThangNamSinh"
                                placeholder="Ngày Tháng Năm Sinh"
                                required
                                onChange={(event) =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    dateOfBirth: event.target.value,
                                  }))
                                }
                                onBlur={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    dateOfBirthError: validateNgaySinh(
                                      userData.dateOfBirth,
                                    ),
                                  }));
                                }}
                                onInput={() => {
                                  setUserDataError((prev) => ({
                                    ...prev,
                                    dateOfBirthError: {
                                      check: true,
                                      text: "",
                                    },
                                  }));
                                }}
                              />
                              <label
                                className="form-label"
                                htmlFor="ngayThangNamSinh"
                              >
                                Date of birth
                              </label>
                            </div>
                          </div>

                          {/* <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div> */}
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            {loading ? (
                              <CircularIndeterminate />
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={handleRegister}
                              >
                                Register
                              </button>
                            )}
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        style={{ boxShadow: "0px 5px 20px 0px #d2dae3" }}
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;
