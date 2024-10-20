import { ChevronDown, Filter, GanttChart, Plus, RotateCcw } from "lucide-react";
import DataTable from "../Table/AccountTable";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import FacebookLoginComponent from "../../../utils/FB";
import { BASE_URL } from "../../../data";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../../Loader/Loader";
import { useAppState } from "../../../utils/Context";
import CreateReportModal from "./CreateReportModal";
import { toastsettings } from "../../../utils/toastsettings";
import ReportsTable from "./ReportsTable";

const ReportsLanding = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [Status, setStatus] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [metaData, setMetaData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reports, setReports] = useState([]);
//   {
//     "id": 71, == 
//     "link": null,
//     "metrics": [
//         "page_follows",
//         "page_fans",
//         "page_video_views_unique",
//         "page_video_views",
//         "page_impressions_unique",
//         "page_impressions"
//     ],==
//     "name": "Arin Paliwal", ==
//     "start_date": "2024-09-30", ==
//     "end_date": "2024-10-13", ==
//     "state": "pending",
//     "top_metric": "page_video_views" ===
// }
  useEffect(() => {
    fetch(`${BASE_URL}/analytic/report/?limit=20`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReports(data.data);
        console.log("HRERERE",data.data);
        setMetaData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while fetching report", toastsettings);
      });
  }, []);
  const { setSidebarOpen } = useAppState();
  function fetchNextPage() {
    const url = metaData.next;
    if (url) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setReports([...reports, ...res.data]);
          setMetaData(res);
        });
    } else {
      console.log("No more data");
      // setdataPresent(false);
    }
  }
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
    if (searchTriggered) {
      fetch(`${BASE_URL}/analytic/report/?search=${searchQuery}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setReports(data.data);
          setMetaData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while fetching report", toastsettings);
        });
    }
  }, [searchTriggered]);
  useEffect(() => {
    if(searchQuery === "") {
      fetch(`${BASE_URL}/analytic/report/?limit=20`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setReports(data.data);
          setMetaData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while fetching report", toastsettings);
        });
    }
  }, [searchQuery]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8 w-full min-h-screen">
          <div className="top-0 sticky flex flex-col gap-8 py-6 pr-6 bg-white">
            <div className="flex sm:flex-row gap-3 flex-col justify-between sm:items-center w-full">
              <div className="flex items-center">
                <GanttChart
                  size={40}
                  className="mr-4 sm:hidden flex"
                  onClick={() => setSidebarOpen(true)}
                />
                <h1 className="flex font-bold text-3xl">
                  Reports
                  <p className="text-gray-500 text-sm ml-2">
                    {/* ({campaignMetaData.total}) */}
                    Showing {reports.length} of {metaData.total}{" "}
                  </p>
                </h1>
              </div>
              <div className="flex" onClick={() => setOpenModal(!openModal)}>
                <button className="bg-primary text-white rounded-md px-4 flex gap-3 py-2 items-center h-[2.5rem]">
                  Create Report
                  <Plus size={17} className="" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 sm:flex-row flex-col justify-between mb-[-1rem]">
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
                    className="block w-[35rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
                    placeholder="Search for reports"
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
            </div>
          </div>
          <div className="flex">
            <ReportsTable
              data={reports}
              meta={metaData.total}
              onLoadMore={fetchNextPage}
            />
          </div>
          {openModal && (
            <CreateReportModal
              modalHeading="Create Report"
              close={() => setOpenModal(false)}
              created={() => {
                setOpenModal(false);
                fetch(`${BASE_URL}/analytic/report/?limit=20`, {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setReports(data.data);
                    setMetaData(data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    toast.error(
                      "An error occurred while fetching report",
                      toastsettings
                    );
                  });
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReportsLanding;
