/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { ToastContainer } from "react-toastify";
import { useAppState } from "../utils/Context";
import AnalyticsLanding from "../components/Dashboard/TabComponent/Analytics/AnalyticsLanding";
import { BASE_URL } from "../data";
import Cookies from "js-cookie";
import ReportsLanding from "../components/Dashboard/Reports/ReportsLanding";

const ReportsMain = () => {
  const { metricNames, setMetricNames } = useAppState();
  const { sidebarOpen, setSidebarOpen } = useAppState();
  useEffect(() => {
    const fetchMetricsNames = async () => {
      const response = await fetch(`${BASE_URL}/analytic/metric/names/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data.map((item) => item.metric_name));
      if (response.status === 200) {
        // setMetricNames(data.data.map((item) => item.metric_name.trim()));
        // setMetricNames(data.data.map((item) => item.metric_name));
        // trim the metric names
        setMetricNames(data.data.map((item) => item.metric_name.trim()));
      }
    };
    fetchMetricsNames();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="sm:flex hidden">
        <div className="flex w-1/6 fixed">
          <Sidebar />
        </div>
        <div className="flex w-5/6 ml-[18%]">
          <ReportsLanding />
        </div>
      </div>
      <div className="sm:hidden flex w-full justify-center">
        {sidebarOpen ? <Sidebar /> : <ReportsLanding />}
      </div>
    </>
  );
};

export default ReportsMain;
