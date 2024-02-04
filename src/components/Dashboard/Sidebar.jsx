import { Clock2, Mail, Power, Users } from 'lucide-react'
import { useAppState } from '../../utils/Context';
// import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Slide, toast } from 'react-toastify';
import { BASE_AUTH_URL } from '../../data';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const {state,setState}=useAppState();
    const handleLogout = async () => {
      try {
        await fetch(`${BASE_AUTH_URL}/signout`, {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: Cookies.get("refresh_token"),
          }),
        });
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        toast.success(`Successfully Logged Out`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });

        // Redirect if needed
        window.location.href = "/";
      } catch (error) {
        console.error("Error logging out:", error);
        // Handle error as needed
      }
    };
const navigate=useNavigate()
  return (
    <div className="flex justify-between h-screen flex-col p-8 w-full">
      <div className="flex flex-col gap-[2rem]">
        <div
          className="flex text-2xl font-semibold justify-center titleFont"
        >
          <h1 className="titleFont font-bold">
            <span className="text-primary titleFont">Dash</span>Stack
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex" onClick={() => {setState("campaign");navigate("/dashboard")}}>
            <button
              className={`flex w-full items-center p-2 rounded-md ${
                state === "campaign"
                  ? "bg-primary text-white border-primary"
                  : "bg-[#f5f5f5] dark:bg-[#26282A] dark:border-[#26282A] border-[#f5f5f5] hover:border-primary hover:dark:border-primary"
              }  gap-4 h-[3rem] border-[3px] transform-all duration-300`}
            >
              <Clock2 size={20} className="ml-6" />
              <h1>Campaigns</h1>
            </button>
          </div>
          <div className="flex" onClick={() => {setState("groups");
        navigate("/dashboard")
        }}>
            <button
              className={`flex w-full items-center p-2 rounded-md ${
                state === "groups"
                  ? "bg-primary text-white border-primary"
                  : "bg-[#f5f5f5] dark:bg-[#26282A] dark:border-[#26282A] border-[#f5f5f5] hover:border-primary hover:dark:border-primary"
              }  gap-4 h-[3rem] border-[3px] transform-all duration-300`}
            >
              <Users size={20} className="ml-6" />
              <h1>Groups</h1>
            </button>
          </div>
          <div className="flex" onClick={() => {setState("account");navigate("/dashboard")}}>
            <button
              className={`flex w-full items-center p-2 rounded-md ${
                state === "account"
                  ? "bg-primary text-white border-primary"
                  : "bg-[#f5f5f5] dark:bg-[#26282A] dark:border-[#26282A] border-[#f5f5f5] hover:border-primary hover:dark:border-primary"
              }  gap-4 h-[3rem] border-[3px] transform-all duration-300`}
            >
              <Mail size={20} className="ml-6" />
              <h1>Account</h1>
            </button>
          </div>
        </div>
      </div>
      <div className="flex" onClick={handleLogout}>
        <button className="flex w-full items-center p-2 rounded-md bg-[#f5f5f5] dark:bg-[#26282A] gap-4 h-[3rem] hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transform-all duration-300">
          <Power size={20} className="ml-6" />
          <h1>Logout</h1>
        </button>
      </div>
    </div>
  );
}

export default Sidebar