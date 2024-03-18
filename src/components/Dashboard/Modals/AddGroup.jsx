/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { MultiSelect } from "primereact/multiselect";
import  { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "./style.css";
import { Slide, toast } from "react-toastify";
import { BASE_URL } from "./../../../data";
import Cookies from "js-cookie";
const AddGroup = ({ close }) => {
  const [selectedPages, setSelectedPages] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [groupName, setGroupName] = useState("");
  const [countries, setCountries] = useState([])

  const countryTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.id}`}
          style={{ width: "18px" }}
        />
        <div className="bg-dark">{option.name}</div>
      </div>
    );
  };
  const panelFooterTemplate = () => {
    const length = selectedPages ? selectedPages.length : 0;
    return (
      <div className="py-4 dark:bg-black dark:text-white px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selected.
      </div>
    );
  };
  const handleClick = async () => {
    console.log(groupName, selectedPages);
    if (!groupName || !selectedPages) {
      toast.error("Enter all fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }
    const transformedArray = selectedPages.map((item) => {
      return {
        account_id: item.id,
      };
    });
    try {
      const response = await fetch(`${BASE_URL}/group/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("access_token")}`
        },
        body: JSON.stringify({
          name: groupName,
          accounts: transformedArray
        }),
      });
      const data = await response.json();
      if (data.status === 10000) 
      {
        toast.success("Group created successfully", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        close(); // close modal
      } else {
        toast.error("Failed to create group", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error("Failed to create group", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      console.error("Error creating group:", error);
    }
  };
useEffect(() => {
  console.log(selectedPages)
}, [selectedPages])
  useEffect(() => {
    const fetchdata=async()=>{
      const response = await fetch(`${BASE_URL}/fb/account/?limit=10000`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setCountries(data.data);
    }
    fetchdata();}
  , []);
  const handleScroll = (event) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      console.log('Reached end of scrolling');
    }
  };
  return (
    <div className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full">
      <div className="flex gap-4 flex-col w-full sm:w-[70%] h-[70%] p-8 overflow-y-auto rounded-md bg-white dark:bg-[#3b3b3b]">
        <div className="flex justify-between h-[3rem] items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Add Group</h1>
          </div>
          <div className="flex">
            <button onClick={close} type="button">
              <X
                size={40}
                className="cursor-pointer p-2 hover:bg-primary hover:text-white transform-all duration-500 rounded-full hover:rotate-180"
              />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm">Add Group Name</label>
          <input
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="border p-2 rounded-md dark:bg-black dark:border-gray-500"
          />
        </div>
        <div className="flex flex-col gap-1 text-sm w-full">
          <label>Accounts</label>
          <MultiSelect
            value={selectedPages}
            options={countries}
            onChange={(e) => setSelectedPages(e.value)}
            optionLabel="name"
            placeholder="Select Accounts"
            itemTemplate={countryTemplate}
            panelFooterTemplate={panelFooterTemplate}
            className="w-full border focus:outline-none dark:bg-black"
            display="chip"
            filter
            filterValue={countryFilter}
            onFilterValueChange={(e) => setCountryFilter(e.value)}
            onScroll={handleScroll}
          />
        </div>
        <div className="flex justify-center" onClick={handleClick}>
          <button className="bg-primary hover:bg-[#142065] text-xl text-white rounded-md px-4 py-3 mt-4 transform-all duration-300">
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
