/* eslint-disable no-unused-vars */
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  LoaderIcon,
  MoveUp,
  Info,
  InfoIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "../../Tooltip";
import { BASE_URL } from "../../../../data";
import Cookies from "js-cookie";
import { useAppState } from "../../../../utils/Context";
import { transformMetrics } from "../../../../utils/transformArray";
import { Check } from "lucide-react";
import { toastsettings } from "../../../../utils/toastsettings";
import { toast } from "react-toastify";
import {
  getCurrentDate,
  getDateNDaysEarlier,
} from "../../../../utils/formatTime";
import Loader from "../../../Loader/Loader";
import AnalyticsLandingTopPages from "./AnalyticsLandingTopPages";
import { FacebookEmbed } from "react-social-media-embed";
import { GanttChart } from "lucide-react";

const AnalyticsLanding = () => {
  useEffect(() => {
    // Make sure the FB SDK script has been loaded before trying to use FB.XFBML.parse
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);
  const [summaryFilterButtonPressed, setSummaryFilterButtonPressed] =
    useState(false);
  const [topPostsFilterButtonPressed, setTopPostsFilterButtonPressed] =
    useState(false);
  const [topPagesFilterButtonPressed, setTopPagesFilterButtonPressed] =
    useState(false);
  const [responseSummary, setResponseSummary] = useState([]);
  const default_from_date = getCurrentDate(new Date());
  const { metricNames, setMetricNames } = useAppState();
  const arr = transformMetrics(metricNames);
  let metrics_data = [];
  for (let i = 0; i < metricNames.length; i++) {
    metrics_data.push({ id: i, linkName: arr[i], links_id: metricNames[i] });
  }

  function getlinkNameBylinks_id(id) {
    for (let i = 0; i < metrics_data.length; i++) {
      const check = metrics_data[i].links_id.trim();
      if (check == id) {
        return metrics_data[i].linkName;
      }
    }
  }

  const navigate = useNavigate();
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const [hoveredInformation, setHoveredInformation] = useState(null);
  const [hoveredInformation2, setHoveredInformation2] = useState(null);
  const handleMouseEnterInformation = (index1, index2) => {
    setHoveredInformation(index1);
    setHoveredInformation2(index2);
  };
  const handleMouseLeaveInformation = () => {
    setHoveredInformation(null);
  };
  const [hoveredSummary, setHoveredSummary] = useState(null);
  const handleHoveredSummary = (index) => {
    setHoveredSummary(index);
  };
  const handleMouseLeaveSummary = () => {
    setHoveredSummary(null);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fileType, setFileType] = useState("");
  const [metrics, setMetrics] = useState([
    "page_video_views",
    "page_follows",
    "page_impressions",
    "page_fans",
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fromDate, setFromDate] = useState(getDateNDaysEarlier(7));
  const [toDate, setToDate] = useState(default_from_date);
  const trigger1 = useRef(null);
  const dropdown1 = useRef(null);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  useEffect(() => {
    const fetchDataFromAPIwithParams = async () => {
      if (!fromDate || !toDate || metrics.length === 0) {
        toast.info("Please select all the filters", toastsettings);
      }
      // summary GET API
      var metric_query = "";
      const queryParams = new URLSearchParams();
      if (fileType) queryParams.append("post_type", fileType);
      if (fromDate) queryParams.append("metric_start_date", fromDate);
      if (toDate) queryParams.append("metric_end_date", toDate);
      if (metrics) {
        const modified_metrices = removeWhitespace(metrics);
        metric_query = modified_metrices.join(",");
        queryParams.append("metrics", metric_query);
      }
      // console.log(queryParams);
      // console.log(queryParams.toString());
      const response = await fetch(
        `${BASE_URL}/analytic/page/summary/?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setResponseSummary(data.data);
    };
    fetchDataFromAPIwithParams();
  }, []);
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

  const handleFilterSummary = (linkName, linkHeading) => {
    if (linkHeading === "Filter by") {
      {
        metrics.includes(linkName)
          ? setMetrics(metrics.filter((item) => item !== linkName))
          : setMetrics([...metrics, linkName]);
      }
    } else if (linkHeading === "Content Type") {
      setFileType(linkName);
    }
  };

  function removeWhitespace(array) {
    return array.map((item) => item.trim());
  }

  // useEffect(() => {
  //   console.log(metrics, fileType, fromDate, toDate);
  // }, [metrics, fileType, fromDate, toDate]);
  const fetchDataFromAPIwithParams = async () => {
    if (!fromDate || !toDate || metrics.length === 0) {
      toast.info("Please select all the filters", toastsettings);
      return;
    }
    setSummaryFilterButtonPressed(true);
    // summary GET API
    var metric_query = "";
    const queryParams = new URLSearchParams();
    if (fileType) queryParams.append("post_type", fileType);
    if (fromDate) queryParams.append("metric_start_date", fromDate);
    if (toDate) queryParams.append("metric_end_date", toDate);
    if (metrics) {
      const modified_metrices = removeWhitespace(metrics);
      metric_query = modified_metrices.join(",");
      queryParams.append("metrics", metric_query);
    }
    // console.log(queryParams);
    // console.log(queryParams.toString());
    const response = await fetch(
      `${BASE_URL}/analytic/page/summary/?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    setResponseSummary(data.data);
    setSummaryFilterButtonPressed(false);
    toast.success("Filters Applied successfully", toastsettings);
  };
  // const fetchDataFromAPIwithParams = async () => {}
  const navbarItems = [
    {
      linkName: "Filter by",
      sublinks: metrics_data,
    },
    // {
    //   linkName: "Content Type",
    //   sublinks: [
    //     {
    //       id: 1,
    //       linkName: "All",
    //       links_id: "",
    //     },
    //     {
    //       id: 2,
    //       linkName: "Photos",
    //       links_id: "photos",
    //     },
    //     {
    //       id: 3,
    //       linkName: "Videos",
    //       links_id: "videos",
    //     },
    //     {
    //       id: 4,
    //       linkName: "Feed",
    //       links_id: "feed",
    //     },
    //   ],
    // },
  ];

  const [hoveredIndex2, setHoveredIndex2] = useState(null);
  const [fileType2, setFileType2] = useState("");
  const [topMetricBy, setTopMetricBy] = useState("post_impressions");
  const [metrics2, setMetrics2] = useState([
    "post_video_views_3s",
    "post_video_views_15s",
  ]);
  const handleMouseEnter2 = (index) => {
    setHoveredIndex2(index);
  };

  const handleMouseLeave2 = () => {
    setHoveredIndex2(null);
  };
  const handleFilterSummary2 = (linkName, linkHeading) => {
    if (linkHeading === "Top Metric") {
      setTopMetricBy(linkName);
      setMetrics2([]);
    }
    if (linkHeading === "Other Metrics") {
      if (metrics2.includes(linkName)) {
        // setlocalStorageData({
        //   ...localStorageData,
        //   TopPostOtherMetrics: metrics3.filter((item) => item !== linkName),
        // });
        setMetrics2(metrics2.filter((item) => item !== linkName));
      } else {
        // setlocalStorageData({
        //   ...localStorageData,
        //   TopPostOtherMetrics: [...metrics3, linkName],
        // });
        setMetrics2([...metrics2, linkName]);
      }
    }
    if (linkHeading === "Content Type") {
      setFileType2(linkName);
    }
  };
  const navbarItems2 = [
    {
      linkName: "Top Metric",
      sublinks: metrics_data,
    },
    {
      linkName: "Other Metrics", // sublinks = metrics_data exlcuding topMetricBy
      sublinks: metrics_data.filter((item) => item.links_id !== topMetricBy),
    },
    {
      linkName: "Content Type",
      sublinks: [
        {
          id: 1,
          linkName: "All",
          links_id: "",
        },
        {
          id: 2,
          linkName: "Photos",
          links_id: "photos",
        },
        {
          id: 3,
          linkName: "Videos",
          links_id: "videos",
        },
        {
          id: 4,
          linkName: "Feed",
          links_id: "feed",
        },
      ],
    },
  ];

  const [fromDate2, setFromDate2] = useState(getDateNDaysEarlier(7));
  const [toDate2, setToDate2] = useState(default_from_date);
  const trigger2 = useRef(null);
  const dropdown2 = useRef(null);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown2.current) return;
      if (
        dropdownOpen2 &&
        !dropdown2.current.contains(target) &&
        !trigger2.current.contains(target)
      ) {
        setDropdownOpen2(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen2]);
  const [topPostResponse, setTopPostResponse] = useState();
  // load data from second time with filters
  const fetchDataFromAPIwithParams2 = async () => {
    console.log(topMetricBy, metrics2);
    if (topMetricBy === "" || metrics2.length === 0 || !fromDate2 || !toDate2) {
      toast.info("Please select all the filters", toastsettings);
      return;
    }
    setTopPostsFilterButtonPressed(true);
    var metric_query = "";
    const queryParams = new URLSearchParams();
    if (fromDate2) queryParams.append("metric_start_date", fromDate2);
    if (topMetricBy) {
      const val = topMetricBy.trim();
      queryParams.append("top_metric", val);
    }
    if (fileType2) queryParams.append("post_type", fileType2);
    if (toDate2) queryParams.append("metric_end_date", toDate2);
    queryParams.append("limit", 4);
    if (metrics2) {
      const modified_metrices = removeWhitespace(metrics2);
      metric_query = modified_metrices.join(",");
      queryParams.append("metrics", metric_query);
    }
    // console.log(queryParams); // show length of query params
    // console.log(queryParams.toString()); // show complete query in string
    const response = await fetch(
      `${BASE_URL}/analytic/top/post/?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    setTopPostResponse(data.data);
    setTopPostsFilterButtonPressed(false);
    toast.success("Filters Applied successfully", toastsettings);
  };
  // fetch data on first load
  useEffect(() => {
    const fetchDataFromAPIwithParams2 = async () => {
      // top POST API
      // console.log(topMetricBy, metrics2);
      if (
        topMetricBy === "" ||
        metrics2.length === 0 ||
        !fromDate2 ||
        !toDate2
      ) {
        toast.info("Please select all the filters", toastsettings);
      }
      var metric_query = "";
      const queryParams = new URLSearchParams();
      if (fromDate2) queryParams.append("metric_start_date", fromDate2);
      if (fileType2) queryParams.append("post_type", fileType2);
      if (topMetricBy) {
        const val = topMetricBy.trim();
        queryParams.append("top_metric", val);
      }
      if (toDate2) queryParams.append("metric_end_date", toDate2);
      queryParams.append("limit", 4);
      if (metrics2) {
        const modified_metrices = removeWhitespace(metrics2);
        metric_query = modified_metrices.join(",");
        queryParams.append("metrics", metric_query);
      }
      // console.log(queryParams); // show length of query params
      // console.log(queryParams.toString()); // show complete query in string
      const response = await fetch(
        `${BASE_URL}/analytic/top/post/?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setTopPostResponse(data.data);
    };
    fetchDataFromAPIwithParams2();
  }, []);

  // for top pages section
  const [topPageResponse, setTopPageResponse] = useState();
  const [hoveredIndex3, setHoveredIndex3] = useState(null);
  const [fileType3, setFileType3] = useState("");
  const [topMetricBy3, setTopMetricBy3] = useState("page_follows");
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const [fromDate3, setFromDate3] = useState(getDateNDaysEarlier(7));
  const [toDate3, setToDate3] = useState(default_from_date);
  const trigger3 = useRef(null);
  const dropdown3 = useRef(null);
  const [metrics3, setMetrics3] = useState([
    "post_video_views_15s",
    "post_impressions",
    "post_video_views_3s",
  ]);
  const handleMouseEnter3 = (index) => {
    setHoveredIndex3(index);
  };
  const handleMouseLeave3 = () => {
    setHoveredIndex3(null);
  };
  const handleFilterSummary3 = (linkName, linkHeading) => {
    if (linkHeading === "Top Metric") {
      setTopMetricBy3(linkName);
      setMetrics3([]);
    }
    if (linkHeading === "Other Metrics") {
      if (metrics3.includes(linkName)) {
        setMetrics3(metrics3.filter((item) => item !== linkName));
      } else {
        setMetrics3([...metrics3, linkName]);
      }
    }
    if (linkHeading === "Content Type") {
      setFileType3(linkName);
    }
  };
  const navbarItems3 = [
    {
      linkName: "Top Metric",
      sublinks: metrics_data,
    },
    {
      linkName: "Other Metrics",
      sublinks: metrics_data.filter((item) => item.links_id !== topMetricBy3),
    },
  ];
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown3.current) return;
      if (
        dropdownOpen3 &&
        !dropdown3.current.contains(target) &&
        !trigger3.current.contains(target)
      ) {
        setDropdownOpen3(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen3]);
  const fetchDataFromAPIwithParams3 = async () => {
    // top Pages API
    if (
      topMetricBy3 === "" ||
      metrics3.length === 0 ||
      !fromDate3 ||
      !toDate3
    ) {
      toast.info("Please select all the filters", toastsettings);
      return;
    }
    setTopPagesFilterButtonPressed(true);
    var metric_query = "";
    const queryParams = new URLSearchParams();
    if (fromDate3) queryParams.append("metric_start_date", fromDate3);
    if (topMetricBy3) {
      const val = topMetricBy3.trim();
      queryParams.append("top_metric", val);
    }
    if (toDate3) queryParams.append("metric_end_date", toDate3);
    // if (fileType3) queryParams.append("post_type", fileType3);
    queryParams.append("limit", 6);
    if (metrics3) {
      const modified_metrices = removeWhitespace(metrics3);
      metric_query = modified_metrices.join(",");
      queryParams.append("metrics", metric_query);
    }
    console.log(queryParams); // show length of query params
    console.log(queryParams.toString()); // show complete query in string
    const response = await fetch(
      `${BASE_URL}/analytic/top/page/?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setTopPageResponse(data.data);
    setTopPagesFilterButtonPressed(false);
    toast.success("Filters Applied successfully", toastsettings);
  };
  useEffect(() => {
    const fetchDataFromAPIwithParams3 = async () => {
      // top Pages API
      if (
        topMetricBy3 === "" ||
        metrics3.length === 0 ||
        !fromDate3 ||
        !toDate3
      ) {
        toast.info("Please select all the filters", toastsettings);
      }
      var metric_query = "";
      const queryParams = new URLSearchParams();
      if (fromDate3) queryParams.append("metric_start_date", fromDate);
      if (topMetricBy3) {
        const val = topMetricBy3.trim();
        queryParams.append("top_metric", val);
      }
      if (toDate3) queryParams.append("metric_end_date", toDate3);
      queryParams.append("limit", 6);
      if (metrics3) {
        const modified_metrices = removeWhitespace(metrics3);
        metric_query = modified_metrices.join(",");
        queryParams.append("metrics", metric_query);
      }
      const response = await fetch(
        `${BASE_URL}/analytic/top/page/?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      console.log("Response for top pages", response);
      const data = await response.json();
      if(data.status==1010001){
        toast.error("Error Fetching Data", toastsettings);
      }
      console.log(data);
      setTopPageResponse(data.data);
    };
    fetchDataFromAPIwithParams3();
  }, []);

  function fetchNextPage() {}

  const { sidebarOpen, setSidebarOpen } = useAppState();
  return (
    <>
      {!topPostResponse || !responseSummary ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col p-8 gap-8 w-full">
            <div className="flex items-center mt-6">
              <div className="flex items-center gap-4">
                <GanttChart
                  size={40}
                  className="mr-4 sm:hidden flex"
                  onClick={() => setSidebarOpen(true)}
                />
                <h1 className="text-3xl font-bold">Performance Summary</h1>
              </div>
              <div className="flex px-10 gap-2 z-30">
                {navbarItems.map((item, index) => (
                  <div
                    className="relative"
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center gap-2 cursor-pointer border-2 rounded-md hover:bg-gray-200 p-2">
                      <h1 className="text-gray-600 dark:text-gray-300">
                        {item.linkName}
                      </h1>
                      <ChevronDown
                        size={20}
                        className="text-gray-600 dark:text-gray-300"
                      />
                    </div>
                    {hoveredIndex === index && (
                      <div className="text-sm absolute space-y-1 top-full bg-white dark:bg-black shadow-md rounded-md p-2 w-[14rem] max-h-[20rem] overflow-auto">
                        {item.sublinks.map((sublink, subIndex) => (
                          <div
                            key={subIndex}
                            onClick={() =>
                              handleFilterSummary(
                                sublink.links_id,
                                item.linkName
                              )
                            }
                            className="cursor-pointer flex items-center justify-between px-4 p-2 rounded-md hover:bg-[#f5f5f5]"
                          >
                            <h1 className="w-[80%]">{sublink.linkName}</h1>
                            {metrics.includes(sublink.links_id) && (
                              <Check size={20} className="text-green-600" />
                            )}
                            {fileType === sublink.links_id && (
                              <Check size={20} className="text-green-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="relative inline-block text-center">
                  <button
                    title="Select Date"
                    id="dropdownDefaultButton"
                    onClick={() => setDropdownOpen1(!dropdownOpen1)}
                    className="flex items-center gap-2 cursor-pointer border-2 rounded-md hover:bg-gray-200 p-2"
                    type="button"
                    ref={trigger1}
                  >
                    <h1>Select Date</h1>
                    <ChevronDown size={20} className="text-gray-500" />
                  </button>
                </div>
                {dropdownOpen1 && (
                  <div
                    className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow top-[7rem] right-[22rem]"
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
                  className="flex items-center gap-2 p-2 rounded-md items-center bg-primary text-white"
                  onClick={fetchDataFromAPIwithParams}
                >
                  <button className="flex gap-2 items-center">
                    {summaryFilterButtonPressed && (
                      <LoaderIcon size={20} className="animate-spin" />
                    )}
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 max-h-[15rem] overflow-auto">
              {responseSummary.map((item, index) => (
                <div
                  className="flex flex-col gap-4 bg-[#f5f5f5] p-4 rounded-md w-[15rem]"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <h1>{item.label}</h1>
                    <InfoIcon
                      size={20}
                      className="text-gray-500 cursor-pointer"
                      onMouseEnter={() => handleHoveredSummary(index)}
                      onMouseLeave={handleMouseLeaveSummary}
                    />
                    {hoveredSummary === index &&
                        <div className="absolute bg-white dark:bg-black p-2 rounded-md shadow-md mt-14">
                          <h1>{item.description}</h1>
                        </div>
                      }
                  </div>
                  <div className="flex gap-4 items-end">
                    <h1 className="font-bold text-xl">{item.value}</h1>
                    <div className="flex items-end">
                      <MoveUp size={30} className="text-green-600" />
                      <h1 className="text-green-600">+{item.growth}%</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <hr className="bg-[#f1f1f1] w-full rounded-md" />
            </div>
            {/* summary ends here */}
            {/* top post starts here */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">Top Posts</h1>
                  <div className="flex px-10 gap-2">
                    {navbarItems2.map((item, index) => (
                      <div
                        className="relative"
                        key={index}
                        onMouseEnter={() => handleMouseEnter2(index)}
                        onMouseLeave={handleMouseLeave2}
                      >
                        <div className="flex items-center gap-2 cursor-pointer border-2 rounded-md hover:bg-gray-200 p-2">
                          <h1 className="text-gray-600 dark:text-gray-300">
                            {item.linkName}
                          </h1>
                          <ChevronDown
                            size={20}
                            className="text-gray-600 dark:text-gray-300"
                          />
                        </div>
                        {hoveredIndex2 === index && (
                          <div className="text-sm z-30 absolute space-y-1 top-full bg-white dark:bg-black shadow-md rounded-md p-2 w-[14rem] max-h-[20rem] overflow-auto">
                            {item.sublinks.map((sublink, subIndex) => (
                              <div
                                key={subIndex}
                                onClick={() =>
                                  handleFilterSummary2(
                                    sublink.links_id,
                                    item.linkName
                                  )
                                }
                                className="cursor-pointer flex items-center justify-between px-4 p-2 rounded-md hover:bg-[#f5f5f5]"
                              >
                                <h1 className="w-[80%]">{sublink.linkName}</h1>
                                {item.linkName === "Other Metrics" &&
                                  metrics2.includes(sublink.links_id) && (
                                    <Check
                                      size={20}
                                      className="text-green-600"
                                    />
                                  )}
                                {topMetricBy === sublink.links_id && (
                                  <Check size={20} className="text-green-600" />
                                )}
                                {fileType2 === sublink.links_id && (
                                  <Check size={20} className="text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="relative inline-block text-center">
                      <button
                        title="Select Date"
                        id="dropdownDefaultButton"
                        onClick={() => setDropdownOpen2(!dropdownOpen2)}
                        className="flex items-center gap-2 cursor-pointer border-2 rounded-md hover:bg-gray-200 p-2"
                        type="button"
                        ref={trigger2}
                      >
                        <h1>Select Date</h1>
                        <ChevronDown size={20} className="text-gray-500" />
                      </button>
                    </div>
                    {dropdownOpen2 && (
                      <div
                        className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow top-[22rem] right-[31rem]"
                        ref={dropdown2}
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
                              value={fromDate2}
                              onChange={(e) => setFromDate2(e.target.value)}
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
                              value={toDate2}
                              onChange={(e) => setToDate2(e.target.value)}
                              className="w-40 h-full text-gray-500 flex bg-white p-2 rounded-md"
                              placeholder="To Date"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className="flex p-2 rounded-md justify-center items-center bg-primary text-white"
                      onClick={fetchDataFromAPIwithParams2}
                    >
                      <button className="flex gap-2 items-center">
                        {topPostsFilterButtonPressed && (
                          <LoaderIcon size={20} className="animate-spin" />
                        )}
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="flex"
                  onClick={() => {
                    {
                      localStorage.setItem("TopPostTopMetric", topMetricBy);
                      localStorage.setItem("TopPostMetrics", metrics2);
                      localStorage.setItem("FileType", fileType2);
                      localStorage.setItem("FromDate", fromDate2);
                      localStorage.setItem("ToDate", toDate2);
                      navigate("/dashboard/anaytics/top-posts/view-all");
                    }
                  }}
                >
                  <button className="flex gap-2 items-center p-2 justify-center bg-white rounded-md text-gray-500 focus:outline-none hover:bg-gray-200 border-2 w-[6rem] hover:text-black">
                    View All
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {topPostResponse?.map((item, index) => (
                  <div
                    className="flex flex-col gap-5 w-[16rem] bg-[#f5f5f5] p-2 rounded-md"
                    key={index}
                  >
                    <div className="flex">
                      {/* <FacebookEmbed
                        url={item.post_link}
                        width={240}
                        height={250}
                      /> */}
                      {/* <div
                        className="fb-post"
                        data-href={item.post_link}
                        data-width="500"
                        data-show-text="true"
                      ></div> */}
                      <iframe
                        src={`https://www.facebook.com/plugins/post.php?href=${item.post_link}&height=400&show_text=false&appId=332688753090534&height=0`}
                        width="240"
                        height="300"
                      ></iframe>
                    </div>
                    <div className="flex flex-col text-sm">
                      <h1 className="font-bold">{item.account_name}</h1>
                      <h1 className="">{item.page_name}</h1>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      {item.mertics?.map((metric_item, index2) => (
                        <div
                          className="flex justify-between"
                          key={index2}
                          onMouseLeave={handleMouseLeaveInformation}
                        >
                          <h1 className="text-gray-600 flex justify-between items-center gap-2 w-[80%]">
                            {getlinkNameBylinks_id(metric_item.metric)}

                            <h1 className="cursor-pointer">
                              <Info
                                onMouseEnter={() =>
                                  handleMouseEnterInformation(index, index2)
                                }
                                className="cursor-pointer text-gray-500"
                                size={15}
                              />
                            </h1>
                            {hoveredInformation === index &&
                              hoveredInformation2 == index2 && (
                                <div className="absolute bg-white dark:bg-black p-2 rounded-md shadow-md mt-14">
                                  <h1>{metric_item.description}</h1>
                                </div>
                              )}
                          </h1>
                          <h1 className="font-bold w-[10%]">
                            {metric_item.value}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* top post ends here */}
            {/* top pages start here */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">Top Pages</h1>
                  <div className="flex px-10 gap-2">
                    {navbarItems3.map((item, index) => (
                      <div
                        className="relative"
                        key={index}
                        onMouseEnter={() => handleMouseEnter3(index)}
                        onMouseLeave={handleMouseLeave3}
                      >
                        <div className="flex items-center gap-2 cursor-pointer border-2 rounded-md hover:bg-gray-200 p-2">
                          <h1 className="text-gray-600 dark:text-gray-300">
                            {item.linkName}
                          </h1>
                          <ChevronDown
                            size={20}
                            className="text-gray-600 dark:text-gray-300"
                          />
                        </div>
                        {hoveredIndex3 === index && (
                          <div className="text-sm absolute space-y-1 top-full bg-white dark:bg-black shadow-md rounded-md p-2 w-[14rem] max-h-[20rem] overflow-auto">
                            {item.sublinks.map((sublink, subIndex) => (
                              <div
                                key={subIndex}
                                onClick={() =>
                                  handleFilterSummary3(
                                    sublink.links_id,
                                    item.linkName
                                  )
                                }
                                className="cursor-pointer flex items-center justify-between px-4 p-2 rounded-md hover:bg-[#f5f5f5]"
                              >
                                <h1 className="w-[80%]">{sublink.linkName}</h1>
                                {item.linkName === "Other Metrics" &&
                                  metrics3.includes(sublink.links_id) && (
                                    <Check
                                      size={20}
                                      className="text-green-600"
                                    />
                                  )}
                                {topMetricBy3 === sublink.links_id && (
                                  <Check size={20} className="text-green-600" />
                                )}
                                {fileType3 === sublink.links_id && (
                                  <Check size={20} className="text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="relative inline-block text-center">
                      <button
                        title="Select Date"
                        id="dropdownDefaultButton"
                        onClick={() => setDropdownOpen3(!dropdownOpen3)}
                        className="flex items-center gap-2 cursor-pointer border-2 rounded-md hover:bg-gray-200 p-2"
                        type="button"
                        ref={trigger3}
                      >
                        <h1>Select Date</h1>
                        <ChevronDown size={20} className="text-gray-500" />
                      </button>
                      {dropdownOpen3 && (
                        <div
                          className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow"
                          ref={dropdown3}
                        >
                          <div className="flex gap-2">
                            <div className="flex flex-col">
                              <label className="text-gray-500 flex bg-white p-2 rounded-md">
                                Start Date
                              </label>
                              <input
                                type="date"
                                id="fromDate"
                                value={fromDate3}
                                onChange={(e) => setFromDate3(e.target.value)}
                                className="w-40 h-full text-gray-500 flex bg-white p-2 rounded-md"
                                placeholder="From Date"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="text-gray-500 flex bg-white p-2 rounded-md">
                                End Date
                              </label>
                              <input
                                type="date"
                                id="toDate"
                                value={toDate3}
                                onChange={(e) => setToDate3(e.target.value)}
                                className="w-40 h-full text-gray-500 flex bg-white p-2 rounded-md"
                                placeholder="To Date"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="flex p-2 rounded-md justify-center items-center bg-primary text-white"
                      onClick={fetchDataFromAPIwithParams3}
                    >
                      <button className="flex gap-2 items-center">
                        {topPagesFilterButtonPressed && (
                          <LoaderIcon size={20} className="animate-spin" />
                        )}
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="flex"
                  onClick={() => {
                    localStorage.setItem("TopPagesTopMetric", topMetricBy3);
                    localStorage.setItem("TopPagesMetrics", metrics3);
                    // localStorage.setItem("FileType", fileType2);
                    localStorage.setItem("FromDatePages", fromDate3);
                    localStorage.setItem("ToDatePages", toDate3);
                    navigate("/dashboard/anaytics/top-pages/view-all");
                  }}
                >
                  <button className="flex gap-2 items-center p-2 justify-center bg-white rounded-md text-gray-500 focus:outline-none hover:bg-[#f5f5f5] border-2 w-[6rem] hover:text-black">
                    View All
                  </button>
                </div>
              </div>
              <div className="flex overflow-auto">
                {/* only table */}
                <AnalyticsLandingTopPages
                  data={topPageResponse}
                  meta={6}
                  onLoadMore={fetchNextPage}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AnalyticsLanding;
