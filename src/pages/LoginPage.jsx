import Cookies from "js-cookie";
import { Cookie, EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { BASE_AUTH_URL, BASE_URL } from "./../data";

const LoginPage = () => {
  // const login_page_bg = "/assets/background/login_page_bg.jpg"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const toa = toast.loading("Wait :) Logging you in", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
      // style: {
      //   background: "#000",
      //   color: "#f5f6f9",
      // },
      // progressBar: {
      //   background: "#a32b04",
      // },
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
      const response = await fetch(`${BASE_AUTH_URL}/signin`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          credential: email,
          secret: password,
          type: "email_password",
        }),
      });
      const data = await response.json();
      console.log("response", response, "and data", data);
      if (response.ok) {
        toast.update(toa, {
          render: "Successfully Logged in :)",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
        Cookies.set("access_token", data.data.access_token);
        Cookies.set("refresh_token", data.data.refresh_token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.update(toa, {
          render: "Wrong Credentials :(",
          type: "error",
          autoClose: 1500,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      const toa = toast.loading("Wait :) Logging you in", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      setTimeout(() => {
        toast.update(toa, {
          render: "Successfully Logged in :)",
          type: "success",
          autoClose: 1000,
          isLoading: false,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }, 1000);
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="flex sm:flex-row gap-[4rem] flex-col p-6 h-screen">
        <div
          className="flex sm:w-1/2 items-center justify-center text-white rounded-2xl h-full"
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
        <div className="flex sm:w-1/2 flex-col gap-[1.8rem] justify-center items-center">
          <div className="flex w-[60%]">
            <h1 className="text-3xl font-bold">Simple Flow</h1>
          </div>
          <div className="flex justify-center gap-4 bg-[#ECF0FF] p-2 rounded-md dark:bg-darkprimary">
            <div className="flex">
              <button className="bg-primary xl:w-[200px] w-[150px] text-white rounded-md p-2">
                Sign In
              </button>
            </div>
            {/* <div className="flex"
            //  onClick={() => navigate("/signup")}
             >
              <button className="text-[#9C9AA5] xl:w-[200px] w-[150px] rounded-md p-2">
                Sign Up
              </button>
            </div> */}
          </div>
          <div className="flex flex-col gap-6 sm:w-[60%] w-full">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="input-group-1"
                className="block font-semibold  text-gray-900 dark:text-white"
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
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="input-group-1"
                  className="block font-semibold  text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="text-sm hover:underline cursor-pointer text-[#9c9aa5]">
                  <h1>Forgot Password ?</h1>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Lock
                    className=" text-gray-600 dark:text-gray-300"
                    size={17}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="input-group-1"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-darkprimary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Enter your password"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="text-gray-400" size={25} />
                  ) : (
                    <EyeIcon className="text-gray-400" size={25} />
                  )}
                </span>
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
    </>
  );
};

export default LoginPage;
