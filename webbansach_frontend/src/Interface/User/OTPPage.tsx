// import React, { useState, useRef } from "react";

// const styles = {
//   container: {
//     height: "auto",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     width: "400px",
//     border: "none",
//     height: "300px",
//     boxShadow: "0px 5px 20px 0px #d2dae3",
//     zIndex: "1",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   h6: {
//     color: "red",
//     fontSize: "20px",
//   },
//   inputs: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: "2rem",
//   },
//   input: {
//     width: "40px",
//     height: "40px",
//     margin: "0.5rem",
//   },
//   validateButton: {
//     borderRadius: "20px",
//     height: "40px",
//     backgroundColor: "red",
//     border: "1px solid red",
//     width: "140px",
//   },
// };

// const MyOTPInput = () => {
//   const [otpCode, setOtpCode] = useState(Array(6).fill(null));
//   const [indexType, setIndexType] = useState(0);
//   const inputRefs = useRef<HTMLInputElement[]>([]);

//   const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
//     // Xử lý khi người dùng ấn Validate
//   };

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     currentIndex: number
//   ) => {
//     const newValue = event.target.value;
//     setOtpCode((prevOtpCode) => {
//       const newOtpCode = [...prevOtpCode];
//       newOtpCode[currentIndex] = newValue;
//       return newOtpCode;
//     });

//     if (newValue.length === 1 && currentIndex < 5) {
//       setIndexType(currentIndex + 1);
//       if (inputRefs.current[currentIndex + 1]) {
//         inputRefs.current[currentIndex + 1].focus();
//       }
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div className="position-relative">
//         <div className="card p-2 text-center" style={styles.card}>
//           <h6 style={styles.h6}>
//             Vui lòng nhập mã OTP để xác minh tài khoản của bạn
//           </h6>
//           <div>
//             {" "}
//             <span>Mã đã được gửi đến</span> <small>*******9897</small>{" "}
//           </div>
//           <div className="inputs d-flex flex-row justify-content-center mt-2">
//             {otpCode.map((value, index) => (
//               <input
//                 ref={(el: any) => (inputRefs.current[index] = el)}
//                 key={index}
//                 onChange={(event) => handleInputChange(event, index)}
//                 value={value}
//                 maxLength={1}
//                 className="m-2 text-center form-control rounded"
//                 type="text"
//                 style={styles.input}
//               />
//             ))}
//           </div>
//           <div className="mt-4">
//             <button
//               onClick={handleSubmit}
//               className="btn btn-danger px-4 validate"
//               style={styles.validateButton}
//             >
//               Validate
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOTPInput;

/// dung useEffect.

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "400px",
    border: "none",
    height: "300px",
    boxShadow: "0px 5px 20px 0px #d2dae3",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  h6: {
    color: "red",
    fontSize: "20px",
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2rem",
  },
  input: {
    width: "40px",
    height: "40px",
    margin: "0.5rem",
  },
  validateButton: {
    borderRadius: "20px",
    height: "40px",
    backgroundColor: "red",
    border: "1px solid red",
    width: "140px",
  },
};

interface MyOTPInputInterface {
  email: string;
}

const MyOTPInput: React.FC<MyOTPInputInterface> = ({ email }) => {
  console.log({ email });
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(""));
  const [indexType, setIndexType] = useState(0);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const submit = otpCode.join("").length === 6;
  const [typeWrongOtp, setTypeWrongOtp] = useState(false);

  console.log(submit);
  useEffect(() => {
    if (inputRefs.current[indexType]) {
      const inputElement = inputRefs.current[indexType];
      const submit = otpCode.join("").length === 6;
      inputElement.focus();
    }
  }, [indexType]);

  //   Handle submit
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    console.log(otpCode.join(""));

    const requestData = {
      otpCode: otpCode.join(""),
      email: email,
    };
    console.log(requestData);

    try {
      // Gửi yêu cầu đăng ký bằng phương thức POST
      const response = await fetch("http://localhost:8080/account/active", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Xác thực thành công xin mời đăng nhập");
        navigate("/loginpage");
      } else {
        setTypeWrongOtp(true);
        console.error("Failed to activate account. Status:", response.status);
      }
    } catch (error: any) {
      setTypeWrongOtp(true);
      console.error("Registration error:", error.message);
    }
  };

  //   Handle input
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const newValue = event.target.value;
    setOtpCode((prevOtpCode) => {
      const newOtpCode = [...prevOtpCode];
      newOtpCode[currentIndex] = newValue;
      return newOtpCode;
    });

    if (newValue.length === 1 && currentIndex < 5) {
      setIndexType(currentIndex + 1);
    }
  };

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ): void {
    if (event.key === "Backspace" && indexType > 0 && otpCode[index] === "") {
      setIndexType(index - 1);
    }
    if (event.key === "Backspace" && indexType === 0) {
      setOtpCode((prevOtpCode) => {
        const newOtpCode = [...prevOtpCode];
        newOtpCode[0] = "";
        return newOtpCode;
      });
    }
    //  else if (event.key === "ArrowRight") {
    //     setIndexType(index + 1);
    // } else if (event.key === "ArrowLeft") {
    //     setIndexType(index - 1);
    // }
  }

  return (
    <div style={styles.container}>
      <div className="position-relative">
        <div className="card p-2 text-center" style={styles.card}>
          <h6 style={styles.h6}>
            Vui lòng nhập mã OTP để xác minh tài khoản của bạn
          </h6>
          <div>
            {" "}
            <span>Mã đã được gửi đến</span> <small>*******9897</small>{" "}
          </div>
          <div className="inputs d-flex flex-row justify-content-center mt-2">
            {otpCode.map((value, index) => (
              <input
                ref={(el: any) => (inputRefs.current[index] = el)}
                key={index}
                onChange={(event) => handleInputChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onClick={() => setIndexType(index)}
                value={value}
                maxLength={1}
                className="m-2 text-center form-control rounded"
                style={styles.input}
                type="text"
              />
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="btn btn-danger px-4 validate"
              style={styles.validateButton}
              disabled={!submit}
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOTPInput;
