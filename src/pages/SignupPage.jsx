import { Lock } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { BASE_AUTH_URL } from "../data";
import Cookies from "js-cookie";

const SignupPage = () => {
  // const login_page_bg = "/assets/background/login_page_bg.jpg"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = () => {
    const containsNameOrEmail = password.includes("name@simpleflow.com");
    const hasMinLength = password.length >= 8;
    const hasNumberOrSymbol = /[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(
      password
    );

    if (containsNameOrEmail) {
      setPasswordStrength("Cannot contain name or email");
    } else if (hasMinLength && hasNumberOrSymbol) {
      setPasswordStrength("Strong");
    } else if (hasMinLength) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength();
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const toa = toast.loading("Wait :) Signing you up", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
    if (!email || !password) {
      return toast.update(toa, {
        render: "All fields are mandatory ;)",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
    try {
      const response = await fetch(`${BASE_AUTH_URL}/signup`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          credential: email,
          secret: password,
          type: "email_password",
        }),
      });
      const data = await response.json();
      console.log("response", response, "and data", data);
      if (data.status=="10000") {
        toast.update(toa, {
          render: "Account Created :) Now Login",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.update(toa, {
          render: "Error Occured :(",
          type: "error",
          autoClose: 1500,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex md:flex-row gap-[4rem] flex-col p-6 h-screen">
      <div
        className="flex w-1/2 items-center justify-center text-white rounded-2xl"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg?w=996&t=st=1706124215~exp=1706124815~hmac=e5f63f3d946053d22d8a88c6714dc4db952192a2269cc06e3c43c56dda55f06d')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl">Welcome to Joy of Giving</h1>
          <h1>Your Social Media Manager</h1>
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-[1.8rem] justify-center items-center">
        <div className="flex w-[60%]">
          <h1 className="text-3xl font-bold">Simple Flow</h1>
        </div>
        <div className="flex justify-center gap-4 bg-[#ECF0FF] p-2 rounded-md w-[60%] dark:bg-darkprimary">
          <div className="flex" onClick={() => navigate("/")}>
            <button className="w-[200px] text-[#9C9AA5] rounded-md p-2">
              Sign In
            </button>
          </div>
          <div className="flex">
            <button className="bg-primary text-white w-[200px] rounded-md p-2">
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-[60%]">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="input-group-1"
              className="block font-semibold text-gray-900 dark:text-white"
            >
              Email Id
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-1"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-darkprimary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@simpleflow.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="input-group-1"
              className="block font-semibold  text-gray-900  dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Lock className=" text-gray-600 dark:text-gray-300" size={17} />
              </div>
              <input
                type="password"
                id="input-group-1"
                value={password}
                onChange={handlePasswordChange}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-darkprimary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  passwordStrength === "Weak"
                    ? "border-red-500"
                    : "border-green-500"
                }`}
                placeholder="Enter your password"
              />

              {password && (
                <div className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  Password Strength: {passwordStrength}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-[60%]" onClick={handleSubmit}>
          <button className="bg-primary h-[48px] w-full text-white rounded-md p-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
