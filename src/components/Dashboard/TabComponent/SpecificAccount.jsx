/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft, ChevronDown, Filter, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../data";
import { useNavigate } from "react-router-dom";
import DataTable from "../Table/SpecificAccountTable";
import Cookies from "js-cookie";
import { useAppState } from "../../../utils/Context";
import Loader from "../../Loader/Loader";

const SpecificAccount = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [Status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [metadata, setMetadata] = useState({});
  
  useEffect(() => {
    const postData = async () => {
      const queryParams = new URLSearchParams();
      if (Status) queryParams.append("state", Status);
      if (searchQuery) queryParams.append("search", searchQuery);
      const id = window.location.pathname.split("/")[2];
      const apiUrl = `${BASE_URL}/fb/account/${id}/?${queryParams}`;
      setLoading(true);
      try {
        const getresponse = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        const data = await getresponse.json();
        setResponse(data.data);
        console.log(response.data);
        setMetadata(data)
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    postData();
  }, [Status, searchTriggered]);
  const { setState } = useAppState();
  const navigate = useNavigate();
  function fetchNextPage() {
    const url = metadata.next;
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
          setResponse([...response, ...res.data]);
          setMetadata(res);
        });
    } else {
      console.log("No more data");
    }
  }
  useEffect(() => {
    if (searchQuery.length <= 0) {
      console.log(searchQuery.length);
      setSearchTriggered(!searchTriggered);
    }
    console.log(searchQuery);
  }, [searchQuery]);
  useEffect(() => {
    fetchNextPage();
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);
  useEffect(() => {
    console.log(dropdownOpen);
  }, [dropdownOpen]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8 w-full min-h-screen">
          <div className="top-0 sticky bg-[#f5f6fa] flex flex-col gap-8  pt-4 pb-8">
            <div className="flex gap-4 items-center w-full">
              <div
                className="flex p-2 cursor-pointer rounded-md bg-white"
                onClick={() => {
                  setState("account");
                  navigate("/dashboard");
                }}
              >
                <ArrowLeft size={25} />
              </div>
              <div className="flex">
                <h1 className="font-bold flex text-3xl">
                  {localStorage.getItem("account_name")}
                  <p className="text-gray-500 text-sm ml-2">
                    Showing {response.length} of {metadata.total}{" "}
                  </p>
                </h1>
              </div>
            </div>
            <div className="flex gap-4 flex-col justify-between mb-[-1rem]">
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
                    placeholder="Search Pages via Name"
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
              {/* <div className="flex relative border-2 border-gray-300 rounded-xl w-fit bg-white">
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
                    className="z-50 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow left-[10rem] bottom-[-8rem]"
                  >
                    <div className="flex flex-col gap-1">
                      <div
                        className="flex hover:bg-gray-200 p-2 cursor-pointer rounded-md"
                        onClick={() => setStatus(null)}
                      >
                        All
                      </div>
                      <div
                        className="flex hover:bg-gray-200 p-2 cursor-pointer rounded-md"
                        onClick={() => setStatus("Healthy")}
                      >
                        Healthy
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
                <div
                  className="flex gap-2 px-4  justify-center items-center cursor-pointer"
                  onClick={() => {
                    setStatus(null);
                    setSearchQuery("");
                    setSearchTriggered(!searchTriggered);
                  }}
                >
                  <RotateCcw size={20} className="text-red-500" />
                  <h1>Reset Filter</h1>
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex">
            <DataTable
              data={response}
              meta={metadata.total}
              onLoadMore={fetchNextPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SpecificAccount;
