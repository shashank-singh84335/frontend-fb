import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Content from "../components/Dashboard/Content";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import SpecificContentTab from "../components/Dashboard/SpeicificContentTab";

const SpecificContent = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex">
        <div className="flex w-1/6 fixed">
          <Sidebar />
        </div>
        <div className="flex w-5/6 ml-[18%]">
          <SpecificContentTab />
        </div>
      </div>
    </>
  );
};

export default SpecificContent;
