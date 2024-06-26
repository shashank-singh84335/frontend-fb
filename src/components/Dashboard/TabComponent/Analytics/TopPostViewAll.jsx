/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { CommonAnalyticsStructure } from "../../../../pages/CommonAnalytics";
import {
  getCurrentDate,
  getDateNDaysEarlier,
} from "../../../../utils/formatTime";
import { useAppState } from "../../../../utils/Context";
import { transformMetrics } from "../../../../utils/transformArray";
import { toast } from "react-toastify";
import { toastsettings } from "../../../../utils/toastsettings";
import { BASE_URL } from "../../../../data";
import { Check, ChevronDown, LoaderIcon, Search } from "lucide-react";
import Cookies from "js-cookie";
import AnalyticsLandingTopPages from "./AnalyticsLandingTopPages";
import AnalyticsLandingTopPosts from "./AnalyticsLandingTopPosts";
const TopPostsViewAll = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [topPostsFilterButtonPressed, setTopPostsFilterButtonPressed] =
    useState();
  const dataMetrics = localStorage
    .getItem("TopPostMetrics")
    .split(",")
    .map((name) => name.trim());
    console.log(dataMetrics)
  const [localStorageData, setlocalStorageData] = useState({
    TopPostTopMetric:
      localStorage.getItem("TopPostTopMetric") || "total_comments",
    TopPostOtherMetrics: dataMetrics || [
      "total_reactions",
      "total_shares",
      "post_impressions",
      "post_video_views_3s",
    ],
    TopPostContentType: localStorage.getItem("FileType") || "",
    TopPostFromDate: localStorage.getItem("FromDate") || getDateNDaysEarlier(7),
    TopPostToDate: localStorage.getItem("ToDate") || getCurrentDate(new Date()),
  });
  const default_from_date = getCurrentDate(new Date());
  const { metricNames, setMetricNames } = useAppState();
  console.log("metrics name from top post view all", metricNames);
  const arr = transformMetrics(metricNames);
  let metrics_data = [];
  for (let i = 0; i < metricNames.length; i++) {
    metrics_data.push({ id: i, linkName: arr[i], links_id: metricNames[i] });
  }
  const [topPageResponse, setTopPageResponse] = useState();
  const [MetaData, setMetaData] = useState();
  const [hoveredIndex3, setHoveredIndex3] = useState(null);
  const [fileType3, setFileType3] = useState(
    localStorage.getItem("FileType") || ""
  );
  const [topMetricBy3, setTopMetricBy3] = useState(
    localStorage.getItem("TopPostTopMetric") || "total_comments"
  );
  const [dropdownOpen4, setDropdownOpen4] = useState(false);
  const [fromDate3, setFromDate3] = useState(
    localStorage.getItem("FromDate") || getDateNDaysEarlier(7)
  );
  const [toDate3, setToDate3] = useState(
    localStorage.getItem("ToDate") || getCurrentDate(new Date())
  );
  const trigger4 = useRef(null);
  const dropdown4 = useRef(null);
  const [metrics3, setMetrics3] = useState(
    dataMetrics || [
      "total_reactions",
      "total_shares",
      "post_impressions",
      "post_video_views_3s",
    ]
  );
  const handleMouseEnter3 = (index) => {
    setHoveredIndex3(index);
  };
  const handleMouseLeave3 = () => {
    setHoveredIndex3(null);
  };
  const handleFilterSummary3 = (linkName, linkHeading) => {
    if (linkHeading === "Top Metric") {
      setTopMetricBy3(linkName);
      setlocalStorageData({
        ...localStorageData,
        TopPostTopMetric: linkName,
      });
      localStorage.setItem("TopPostTopMetric", linkName);
      setMetrics3([]);
    }
    if (linkHeading === "Other Metrics") {
      if (metrics3.includes(linkName)) {
        setlocalStorageData({
          ...localStorageData,
          TopPostOtherMetrics: metrics3.filter((item) => item !== linkName),
        });
        localStorage.setItem("TopPostMetrics", metrics3.filter((item) => item !== linkName))
        setMetrics3(metrics3.filter((item) => item !== linkName));
      } else {
        setlocalStorageData({
          ...localStorageData,
          TopPostOtherMetrics: [...metrics3, linkName],
        });
        localStorage.setItem("TopPostMetrics", [...metrics3, linkName])
        setMetrics3([...metrics3, linkName]);
      }
    }
    if (linkHeading === "Content Type") {
      setlocalStorageData({
        ...localStorageData,
        TopPostContentType: linkName,
      });
      setFileType3(linkName);
      localStorage.setItem("FileType", linkName);
    }
  };
  console.log(metrics_data)
  console.log(topMetricBy3)
  const navbarItems3 = [
    {
      linkName: "Top Metric",
      sublinks: metrics_data,
    },
    {
      linkName: "Other Metrics",
      sublinks: metrics_data.filter((item) => item.links_id !== topMetricBy3),
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
  function removeWhitespace(array) {
    return array.map((item) => item.trim());
  }
  const fetchDataFromAPIwithParams3 = async () => {
    console.log("The")
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
    setTopPostsFilterButtonPressed(true);
    var metric_query = "";
    const queryParams = new URLSearchParams();
    if (fromDate3) queryParams.append("metric_start_date", fromDate3);
    if (topMetricBy3) {
      const val = topMetricBy3.trim();
      queryParams.append("top_metric", val);
    }
    if (fileType3) queryParams.append("post_type", fileType3);
    if (toDate3) queryParams.append("metric_end_date", toDate3);
    if (metrics3) {
      const modified_metrices = removeWhitespace(metrics3);
      metric_query = modified_metrices.join(",");
      queryParams.append("metrics", metric_query);
    }
    if(searchQuery) queryParams.append("search",searchQuery)
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
    if(data.data.length==0){
      toast.error("No data found",toastsettings)
    }
    // console.log(data);
    setTopPageResponse(data.data);
    setMetaData(data);
    // console.log(data);
    setTopPostsFilterButtonPressed(false);
  };
  useEffect(() => {
    const fetchDataFromAPIwithParams3 = async () => {
      // top Pages API
      if (localStorageData.TopPostTopMetric === "") {
        toast.info("Please select all the filters", toastsettings);
        return;
      }
      // const toa = toast.loading("Loading Data", toastsettings);
      var metric_query = "";
      const fromDate3 = localStorageData.TopPostFromDate;
      const toDate3 = localStorageData.TopPostToDate;
      const topMetricBy3 = localStorageData.TopPostTopMetric;
      const metrics3 = localStorageData.TopPostOtherMetrics;
      const fileType3 = localStorageData.TopPostContentType;
      const queryParams = new URLSearchParams();
      if (fromDate3) queryParams.append("metric_start_date", fromDate3);
      if (topMetricBy3) {
        const val = topMetricBy3.trim();
        queryParams.append("top_metric", val);
      }
      if (fileType3) queryParams.append("post_type", fileType3);
      if (toDate3) queryParams.append("metric_end_date", toDate3);
      if (metrics3) {
        const modified_metrices = removeWhitespace(metrics3);
        metric_query = modified_metrices.join(",");
        queryParams.append("metrics", metric_query);
      }
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
      // toast.update(toa, {
      //   render: "Data Loaded",
      //   type: "success",
      //   isLoading: false,
      //   autoClose: 500,
      // });
      const data = await response.json();
      console.log(data);
      setTopPageResponse(data.data);
      setMetaData(data);
      console.log(data);
    };
    fetchDataFromAPIwithParams3();
  }, []);
  const [dataPresent, setdataPresent] = useState();
  function fetchNextPage() {
    console.log("Here in fetchNextPage");
    const url = MetaData.next;
    if (topPageResponse !== null && url == null) {
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
          setTopPageResponse([...topPageResponse, ...res.data]);
          setMetaData(res);
        });
    } else {
      console.log("No more data");
      // setdataPresent(false);
    }
  }
  useEffect(()=>{
    if(!searchQuery){
      fetchDataFromAPIwithParams3()
    }
  },[searchQuery])
  return (
    <CommonAnalyticsStructure>
      <div className="flex flex-col gap-8 py-6 mt-6 w-full">
        <div className="flex">
          <h1 className="font-bold flex items-center text-3xl">
            {" "}
            Top Posts
            <p className="text-gray-500 text-sm ml-2">
              {/* ({campaignMetaData.total}) */}
              {/* Showing {topPageResponse?.length} of {MetaData?.total}{" "} */}
            </p>
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-full">
              <Search size={20} className="text-gray-600" />
            </div>
            <input
              type="search"
              id="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="block w-[22rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
              placeholder="Search Top Posts via Name"
              required
            />
            <button
              onClick={() => {
                fetchDataFromAPIwithParams3();
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
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
                          handleFilterSummary3(sublink.links_id, item.linkName)
                        }
                        className="cursor-pointer flex items-center justify-between px-4 p-2 rounded-md hover:bg-[#f5f5f5]"
                      >
                        <h1 className="w-[80%]">{sublink.linkName}</h1>
                        {item.linkName === "Other Metrics" &&
                          metrics3.includes(sublink.links_id) && (
                            <Check size={20} className="text-green-600" />
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
                onClick={() => setDropdownOpen4(!dropdownOpen4)}
                className="flex items-center gap-2 cursor-pointer border-2 rounded-md hover:bg-gray-200 p-2"
                type="button"
              >
                <h1>Select Date</h1>
                <ChevronDown size={20} className="text-gray-500" />
              </button>
              {dropdownOpen4 && (
                <div
                  className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow right-[1rem]"
                  ref={dropdown4}
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
                {topPostsFilterButtonPressed && (
                  <LoaderIcon size={20} className="animate-spin" />
                )}
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        <div className="flex overflow-auto">
          {/* only table */}
          <AnalyticsLandingTopPosts
            data={topPageResponse}
            onLoadMore={fetchNextPage}
            meta={MetaData?.total}
          />
        </div>
      </div>
    </CommonAnalyticsStructure>
  );
};

export default TopPostsViewAll;
