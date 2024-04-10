/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Dashboard/Sidebar";
import { useAppState } from "../utils/Context";
import Content from "../components/Dashboard/Content";

export const CommonAnalyticsStructure = ({children}) => {
  const { sidebarOpen, setSidebarOpen } = useAppState();

  return (
    <>
      <ToastContainer />
      <div className="sm:flex hidden">
        <div className="flex w-1/6 fixed">
          <Sidebar />
        </div>
        <div className="flex w-5/6 ml-[18%]">{children}</div>
      </div>
      <div className="sm:hidden flex w-full justify-center">
        {sidebarOpen ? <Sidebar /> : children}
      </div>
    </>
  );
};
