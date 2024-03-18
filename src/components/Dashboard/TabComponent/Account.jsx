import { ChevronDown, Filter, GanttChart, Plus, RotateCcw } from 'lucide-react';
import DataTable from '../Table/AccountTable';
import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import FacebookLoginComponent from '../../../utils/FB';
import { BASE_URL } from '../../../data';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from '../../Loader/Loader';
import { useAppState } from '../../../utils/Context';

const Account = () => {
  const navigate=useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [Status, setStatus] = useState("")
  const [searchTriggered, setSearchTriggered] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [metaData, setMetaData] = useState({})
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const id = window.location.href.split("#")
    console.log(id)
    if (id.length > 1) {
      const toa=toast.loading("Adding Account ! Don't Refresh", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      const queryParams = id[1].split("&");
      console.log(queryParams);
      let access_token, states;
      for (const param of queryParams) {
        const [key, value] = param.split("=");
        if (key === "access_token") {
          access_token = value;
        } else if (key === "state") {
          states = value;
        }
      }
      const [app_id, app_secret] = states.split("%2C");
      const fetchData = async () => {
        const apiUrl = `${BASE_URL}/fb/account/`;
        try {
          const getresponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            body: JSON.stringify({
              app_info: {
                app_secret: app_secret,
                app_id: app_id,
              },
              token_info: {
                token: access_token,
              },
              other_name:Cookies.get("other_name")
            }),
          });
          const data = await getresponse.json();
          if(data.status=="10000"){
            toast.update(toa, {
              render: "Account Added Successfully",
              type: "success",
              isLoading: false,
              autoClose: 2500,
            });
            setTimeout(() => {
              navigate("/dashboard")
            }, 1000);
          }
          else{
            toast.update(toa, {
              render: "Error Adding Account",
              type: "error",
              isLoading: false,
              autoClose: 2500,
            });
          }
        } catch (error) {
          toast.update(toa, {
            render: "Error Adding Account",
            type: "error",
            isLoading: false,
            autoClose: 2500,
          });
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);
  useEffect(()=>{
    const postData = async () => {
      const queryParams = new URLSearchParams();
      if (Status) queryParams.append("state", Status);
      if (searchQuery) queryParams.append("search", searchQuery);
      setLoading(true);
      const apiUrl = `${BASE_URL}/fb/account/?${queryParams}`;
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
        setMetaData(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    postData();
  },[Status,searchTriggered])
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
          setMetaData(res);
        });
    } else {
      console.log("No more data");
      // setdataPresent(false);
    }
  }
  useEffect(() => {
    fetchNextPage();
  }, []);
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
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8 w-full min-h-screen">
          <div className="top-0 sticky bg-[#f5f6fa] flex flex-col gap-8  pt-4 pb-8">
            <div className="flex sm:flex-row gap-3 flex-col justify-between sm:items-center w-full">
              <div className="flex items-center">
                <GanttChart
                  size={40}
                  className="mr-4 sm:hidden flex"
                  onClick={() => setSidebarOpen(true)}
                />
                <h1 className="flex font-bold text-3xl">
                  Accounts
                  <p className="text-gray-500 text-sm ml-2">
                    {/* ({campaignMetaData.total}) */}
                    Showing {response.length} of {metaData.total}{" "}
                  </p>
                </h1>
              </div>
              <div className="flex" onClick={() => setOpenModal(true)}>
                <button className="bg-primary text-white rounded-md px-4 flex gap-3 py-2 items-center h-[2.5rem]">
                  Add Facebook Account
                  <Plus size={17} className="" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 sm:flex-row flex-coljustify-between mb-[-1rem]">
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
                    placeholder="Search Accounts via Name"
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
                    className="z-10 absolute p-2 bg-white divide-y divide-gray-100 rounded-lg shadow left-[10rem] bottom-[-8rem]"
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
              meta={metaData.total}
              onLoadMore={fetchNextPage}
            />
          </div>
          {openModal && (
            <Modal
              modalHeading="Enter App Id & App Secret"
              close={() => setOpenModal(false)}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Account