/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronDown, Filter, GanttChart, RotateCcw, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "../Table/CampaignTable";
import AddCampaign from "../Modals/AddCampaign";
import { BASE_URL } from "../../../data";
import { useAppState } from "../../../utils/Context";
import Cookies from "js-cookie";
import Loader from "../../Loader/Loader";

const Campaign = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [campaign, setCampaign] = useState([]);
  const [campaignMetaData, setCampaignMetaData] = useState([]);
  const [originialData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [Status, setStatus] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataPresent, setdataPresent] = useState(true);
  const [searchTriggered, setSearchTriggered] = useState(false)
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const trigger1 = useRef(null);
  const dropdown1 = useRef(null);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        dropdownOpen &&
        !dropdown.current.contains(target) &&
        !trigger.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown1.current) return;
      if (
        dropdownOpen1 &&
        !dropdown1.current.contains(target) &&
        !trigger1.current.contains(target)
      ) {
        setDropdownOpen1(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen1]);
  const fetchdata = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (Status) queryParams.append("state", Status);
    if (fromDate) queryParams.append("start_date_after", fromDate);
    if (toDate) queryParams.append("start_date_before", toDate);
    if (searchQuery) queryParams.append("search", searchQuery);

    const response = await fetch(`${BASE_URL}/campaign/?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });

    const data = await response.json();
    console.log("Data", data.data);
    setCampaign(data.data);
    console.log("MetaData", data);
    setCampaignMetaData(data);
    setOriginalData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    console.log(searchQuery)
    fetchdata();
  }, [toDate, fromDate, Status, searchTriggered]);
  
  useEffect(() => {
    if(searchQuery.length<=0){
      console.log(searchQuery.length)
      setSearchTriggered(!searchTriggered);
    }
    console.log(searchQuery)
  }, [searchQuery])
  const { setSidebarOpen } = useAppState();
  function fetchNextPage() {
    console.log(campaignMetaData);
    const url = campaignMetaData.next;
    if (campaignMetaData!==null && url == null) {
      setdataPresent(false);
    }
    if (url) {
      console.log("Fetching next page");
      setdataPresent(true);
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCampaign([...campaign, ...res.data]);
          setCampaignMetaData(res);
        });
    } else {
      console.log("No more data");
      // setdataPresent(false);
    }
  }
  useEffect(() => {
  fetchNextPage();
  }, []);
  // check if window is scrolled and make a state true if scrolled
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      setScrolled(window.scrollY > 10);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8 w-full">
          <div
            className={`top-0 sticky bg-[#f5f6fa] flex flex-col gap-8 ${
              scrolled ? "pt-4" : ""
            } duration-300  `}
          >
            <div className="flex sm:flex-row gap-3 flex-col justify-between sm:items-center">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <GanttChart
                    size={40}
                    className="mr-4 sm:hidden flex"
                    onClick={() => setSidebarOpen(true)}
                  />
                  <h1 className="font-bold flex items-center text-3xl">
                    {" "}
                    Campaigns
                    <p className="text-gray-500 text-sm ml-2">
                      {/* ({campaignMetaData.total}) */}
                      Showing {campaign.length} of {campaignMetaData.total}{" "}
                    </p>
                  </h1>
                </div>
                <div className="flex text-gray-600">
                  View and Manage your campaings directly from here.
                </div>
              </div>
              <div className="flex">
                <button
                  className="bg-primary text-white rounded-md px-4 flex gap-3 py-2 items-center h-[2.5rem]"
                  onClick={() => setOpenModal(true)}
                >
                  Create Campaign
                  <Send size={17} className="" />
                </button>
              </div>
            </div>
            <div
              className={`flex sm:flex-row flex-col duration-300 gap-4 justify-between ${
                scrolled ? "mb-2" : "mb-[-1rem]"
              }`}
            >
              <div className="flex flex-col">
                <div className="flex gap-2 relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-full">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    className="block w-[25rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
                    placeholder="Search Campaigns via Name"
                    required
                  />
                  <button
                    onClick={() => {
                      setSearchTriggered(!searchTriggered);
                    }}
                    className="text-white h-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="flex  border-2 border-gray-300 rounded-xl w-fit bg-white">
                <div className="flex border-r-2 border-gray-300 px-4 h-full justify-center items-center ">
                  <Filter size={26} className="text-gray-600" />
                </div>
                <div className="flex border-r-2 border-gray-300 px-4 h-full justify-center items-center ">
                  <h1 className="text-gray-600">Filter By</h1>
                </div>
                <div className="relative border-r-2 border-gray-300 inline-block text-center">
                  <button
                    id="dropdownDefaultButton"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex gap-2 h-full p-4 bg-white rounded-md text-gray-500  focus:outline-none"
                    type="button"
                    ref={trigger}
                  >
                    <h1>Status</h1>
                    <ChevronDown size={20} className="text-gray-500" />
                  </button>
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdown}
                    id="dropdown"
                    className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow right-[18rem] bottom-[-rem]"
                  >
                    <div className="flex flex-col gap-1">
                      {/* <div
                        className="flex hover:bg-gray-200 p-2 cursor-pointer rounded-md"
                        onClick={() => setStatus(null)}
                      >
                        All
                      </div> */}
                      <div
                        className="flex hover:bg-gray-200 p-2 cursor-pointer rounded-md"
                        onClick={() => setStatus("completed")}
                      >
                        Success
                      </div>
                      <div
                        className="flex hover:bg-gray-200 p-2 cursor-pointer rounded-md"
                        onClick={() => setStatus("failed")}
                      >
                        Failed
                      </div>
                    </div>
                  </div>
                )}
                <div className="relative border-r-2 border-gray-300 inline-block text-center">
                  <button
                    id="dropdownDefaultButton"
                    onClick={() => setDropdownOpen1(!dropdownOpen1)}
                    className="flex gap-2 h-full p-4 bg-white rounded-md text-gray-500  focus:outline-none"
                    type="button"
                    ref={trigger1}
                  >
                    <h1>Select Date</h1>
                    <ChevronDown size={20} className="text-gray-500" />
                  </button>
                </div>
                {dropdownOpen1 && (
                  <div
                    className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow right-[2rem] bottom-[-8rem]"
                    ref={dropdown1}
                  >
                    <div className="flex gap-2">
                      <div className="flex flex-col">
                        <label
                          className="
                        text-gray-500 flex bg-white p-2 rounded-md
                        "
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="fromDate"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="w-40 h-full text-gray-500 flex bg-white p-2 rounded-md"
                          placeholder="From Date"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="
                        text-gray-500 flex bg-white p-2 rounded-md
                        "
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          id="toDate"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="w-40 h-full text-gray-500 flex bg-white p-2 rounded-md"
                          placeholder="To Date"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex gap-2 px-4  justify-center items-center cursor-pointer"
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                    setStatus(null);
                    setSearchQuery("");
                    setSearchTriggered(!searchTriggered);
                  }}
                >
                  <RotateCcw size={20} className="text-red-500" />
                  <h1>Reset Filter</h1>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex">
            Showing {campaign.length} of {campaignMetaData.total} Campaigns
          </div> */}
          <div className="flex">
            <DataTable
              data={campaign}
              onLoadMore={fetchNextPage}
              meta={campaignMetaData.total}
            />
          </div>
          {openModal && (
            <AddCampaign
              modalHeading="Create Campaign"
              close={() => setOpenModal(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Campaign;
