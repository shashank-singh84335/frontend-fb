import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'
import Content from '../components/Dashboard/Content'
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import { useAppState } from '../utils/Context'

const DashboardMain = () => {
  const {sidebarOpen, setSidebarOpen}=useAppState()
  return (
    <>
      <ToastContainer />
        <div className="sm:flex hidden">
          <div className="flex w-1/6 fixed">
            <Sidebar />
          </div>
          <div className="flex w-5/6 ml-[18%]">
            <Content />
          </div>
        </div>
        <div className="sm:hidden flex w-full justify-center">
          {sidebarOpen ? <Sidebar /> : <Content />}
        </div>
    </>
  );
}

export default DashboardMain