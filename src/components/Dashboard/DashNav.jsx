import { ArrowDown, ChevronDown, ChevronUp, Menu, Moon, Search, Sun } from "lucide-react";
import React, { useState } from "react";
import Notifications from "./Notifications";
// import { useTheme } from "next-themes";
import Cookies from "js-cookie";

const DashNav = () => {
    // const {theme, setTheme} = useTheme();
    const [openmodal, setOpenmodal] = useState(false);
    const handleLogout = () => {}
    const username = "John Doe";
    const useremail = "johndoe@gmail.com"
    const role = "Admin"
    // const showname = (theme) => {
    //   if (theme === "light") {
    //     return "Light Mode";
    //   } else {
    //     return "Dark Mode";
    //   }
    // };
    // const handleTheme = () => {
    // setTimeout(() => {
    //   if (theme === "dark") setTheme("light");
    //   if (theme === "light") setTheme("dark");
    //   if (theme === "system") setTheme("dark");
    // }, 0);
  // };
  return (
    <div className="flex items-center h-[4rem] justify-between w-full px-6 py-10">
      <div className="flex gap-6 items-center">
        <div className="flex">
          <Menu size={26} />
        </div>
        <div className="flex">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="text-gray-500 dark:text-gray-300" size={20} />
            </div>
            <input
              type="search"
              id="default-search"
              className="block h-[2.5rem] w-[20rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-[#f5f5f5] focus:ring-blue-500 focus:border-blue-500 dark:bg-darkprimary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            {/* button */}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* <div className="flex" onClick={handleTheme}>
          {theme === "light" ? (
            <div className="flex items-center">
              <Sun
                size={40}
                className="p-2 cursor-pointer rounded-l-md bg-[#f5f5f5]"
              />
              <h1 className="p-2 cursor-pointer rounded-r-md bg-[#f5f5f5]">
                {showname(theme)}
              </h1>
            </div>
          ) : (
            <div className="flex items-center">
              <Moon
                size={40}
                className="p-2 cursor-pointer rounded-l-md bg-[#3b3b3b]"
              />
              <h1 className="p-2 cursor-pointer rounded-r-md bg-[#3b3b3b]">
                {showname(theme)}
              </h1>
            </div>
          )}
        </div> */}
        <Notifications />
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setOpenmodal(!openmodal)}
        >
          <img
            id="avatarButton"
            type="button"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className={`w-[3rem] h-[3rem] p-2 rounded-full cursor-pointer `}
            src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
            loading="lazy"
            width={70}
            height={70}
            alt="User dropdown"
          />
          <div className="flex flex-col text-sm">
            <h1>{username}</h1>
            <h1>{role}</h1>
          </div>
          <div
            className="flex border dark:border-darkprimary rounded-full p-1 cursor-pointer hover:bg-primary hover:text-white transition-all duration-500 "
            onClick={() => setOpenmodal(!openmodal)}
          >
            {openmodal ? (
              <ChevronDown className="transform-all duration-500" size={18} />
            ) : (
              <ChevronDown
                className="rotate-180 transform-all duration-500"
                size={18}
              />
            )}
          </div>
          {openmodal && (
            <div
              id="userDropdown myModal"
              className={`absolute right-0 mr-[2rem] top-0 mt-[4rem] z-20 divide-y divide-gray-100 rounded-lg shadow w-44`}
            >
              <div
                className={`px-4 py-3 text-sm
                }text-gray-900`}
              >
                <div>{username}</div>
                <div className="font-medium truncate">{useremail}</div>
              </div>
              <ul
                className={`py-2 text-sm 
                
                `}
                aria-labelledby="avatarButton"
              >
                <li>
                  <a
                    href="/profile"
                    className={`cursor-pointer block px-4 py-2 `}
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className={`cursor-pointer block px-4 py-2 `}
                  >
                    Dashboard
                  </a>
                </li>
                {/* <li onClick={openChangePasswordModal}>
                  <a
                    className={`cursor-pointer block px-4 py-2 ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-[#474747]"
                    }`}
                  >
                    Change Password
                  </a>
                </li> */}
              </ul>
              <div className="py-1" onClick={handleLogout}>
                <a
                  className={`cursor-pointer block px-4 py-2 text-sm `}
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashNav;
