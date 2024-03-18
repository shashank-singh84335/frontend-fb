import { Filter, GanttChart, RotateCcw, Send, UsersRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import DataTable from "../Table/GroupTable";
import Modal from "../Modal";
import AddGroup from "../Modals/AddGroup";
import { BASE_URL } from "../../../data";
import Cookies from "js-cookie";
import Loader from "../../Loader/Loader";
import { useAppState } from "../../../utils/Context";

const Groups = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [metaData, setMetaData] = useState({});
  useEffect(() => {
    const postData = async () => {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("search", searchQuery);
      setLoading(true);
      const apiUrl = `${BASE_URL}/group/?${queryParams}`;
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
        setMetaData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    postData();
  }, [searchTriggered]);
  const { setSidebarOpen } = useAppState();
  useEffect(() => {
    if (searchQuery.length <= 0) {
      console.log(searchQuery.length);
      setSearchTriggered(!searchTriggered);
    }
    console.log(searchQuery);
  }, [searchQuery]);
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
          setResponse([...response, ...res.data]);
          metaData(res);
        });
    } else {
      console.log("No more data");
    }
  }
  useEffect(() => {
    fetchNextPage();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8 min-h-screen w-full">
          <div className="top-0 sticky bg-[#f5f6fa] flex flex-col gap-8  pt-4 pb-8">
            <div className="flex sm:flex-row gap-3 flex-col justify-between sm:items-center w-full">
              <div className="flex items-center">
                <GanttChart
                  size={40}
                  className="mr-4 sm:hidden flex"
                  onClick={() => setSidebarOpen(true)}
                />
                <h1 className="flex font-bold text-3xl">
                  Groups
                  <p className="text-gray-500 text-sm ml-2">
                    {/* ({campaignMetaData.total}) */}
                    Showing {response?.length} of {metaData.total}{" "}
                  </p>
                </h1>
              </div>
              <div className="flex" onClick={() => setOpenModal(true)}>
                <button className="bg-primary text-white rounded-md px-4 flex gap-3 py-2 items-center h-[2.5rem]">
                  Create Groups
                  <UsersRound size={17} className="" />
                </button>
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
                    placeholder="Search Groups via Name"
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
              {/* <div className="flex border-2 border-gray-300 rounded-xl w-fit bg-white">
                <div className="flex border-r-2 border-gray-300 px-4 h-full justify-center items-center ">
                  <Filter size={26} className="text-gray-600" />
                </div>
                <div className="flex border-r-2 border-gray-300 px-4 h-full justify-center items-center ">
                  <h1 className="text-gray-600">Filter By</h1>
                </div>
                <div
                  className="flex gap-2 px-4  justify-center items-center cursor-pointer"
                  onClick={() => {
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
              onLoadMore={fetchNextPage}
              meta={metaData.total}
            />
          </div>
          {openModal && (
            <AddGroup
              modalHeading="Create Group"
              close={() => setOpenModal(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Groups;
