/* eslint-disable react/prop-types */
import { Image, Paperclip, Smile, Video, X } from "lucide-react";
import { MultiSelect } from "primereact/multiselect";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "./style.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Slide, toast } from "react-toastify";
import { BASE_URL } from './../../../data';
import Cookies from "js-cookie";
const AddCampaign = ({ close }) => {
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [contentType, setContentType] = useState("feed")
  const [totalPagesCount, setTotalPagesCount] = useState(0)
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
    const length = selectedCountries ? selectedCountries.length : 0;
    return (
      <div className="py-4 dark:bg-black dark:text-white px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selected.
      </div>
    );
  };
  const handleFileChangeVideo = (e) => {
    setContentType("videos");
    const file = e.target.files[0];
    const type=file.type.split("/")[0];
    console.log(type)
    if(file && type=="video")
    {setAttachedFile(file);}
    else{
      toast.error('Invalid file type', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      });
    }
  };
  const handleFileChangeImage = (e) => {
    setContentType("photos");
    const file = e.target.files[0];
    const type = file.type.split("/")[0];
    console.log(type);
    if (file && type == "image") {
      setAttachedFile(file);
    } else {
      toast.error("Invalid file type", {
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
  };
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showEmojiPicker && !e.target.closest(".emoji_picker")) {
        setShowEmojiPicker(false);
        console.log("HERE");
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showEmojiPicker]);
  const handleEmojiSelect = (selectedEmoji) => {
    const { native } = selectedEmoji;
    setContent(content + native);
  };
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`${BASE_URL}/group/?limit=10000`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setCountries(data.data);
    };
    fetchdata();
  }, []);
  function extractIds(arrayOfObjects) {
    return arrayOfObjects.map((obj) => obj.id);
  }
  const [buttonClicked, setButtonClicked] = useState(false)
  const handleClick = async() => {
    if ((!campaignName, !selectedCountries, !tag, !content)) {
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
    const array_data=extractIds(selectedCountries);
    console.log(campaignName,array_data, tag, content,contentType, attachedFile,typeof(array_data));
    
    try {
      const toa = toast.loading("Creating Campaign. Do not refresh!", {
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
      setButtonClicked(true);
    const formData = new FormData();
    formData.append('name', campaignName);
    formData.append('tag', tag);
    formData.append('caption', content);
    formData.append('content_type', contentType);
    if(attachedFile)
    {
      formData.append("media_file", attachedFile);
    }
    // formData.append('groups', array_data);
    array_data.forEach((item, index) => {
      formData.append(`groups[${index}]`, item);
    });
    const response = await fetch(`${BASE_URL}/campaign/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: formData,
    });
    const data = await response.json();
    if (data.status === 10000) {
        toast.update(toa, {
          render:data.message,
          type: "success",
          isLoading: false,
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        close();
    } else {
        toast.update(toa, {
          render: data.message,
          type: "error",
          isLoading: false,
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
} 
 catch (error) {
        toast.error("Failed to create campaign", {
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
      console.error('Error creating campaign:', error);
    }
    setButtonClicked(false);
  };
  return (
    <div className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full">
      <div className="flex gap-4 flex-col w-full sm:w-[90%] h-[90%] p-8 overflow-y-auto rounded-md bg-white dark:bg-[#3b3b3b]">
        <div className="flex justify-between h-[3rem] items-center">
          <div className="flex items-center ">
            <h1 className="text-2xl font-bold">Add Campaign</h1>
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
          <label className="text-sm">Add Campaign Name</label>
          <input
            type="text"
            placeholder="Enter Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="border p-2 rounded-md dark:bg-black dark:border-gray-500"
          />
        </div>
        <div className="flex flex-col gap-1 text-sm w-full">
          <label>Groups</label>
          <MultiSelect
            value={selectedCountries}
            options={countries}
            onChange={(e)=>setSelectedCountries(e.value)}
            optionLabel="name"
            placeholder="Select Groups"
            itemTemplate={countryTemplate}
            panelFooterTemplate={panelFooterTemplate}
            className="w-full border focus:outline-none dark:bg-black"
            display="chip"
            filter
            filterValue={countryFilter}
            onFilterValueChange={(e) => setCountryFilter(e.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm">Platform</label>
          <input
            type="text"
            placeholder="Enter Tag"
            value={"Facebook Pages"}
            disabled
            onChange={(e) => setTag(e.target.value)}
            className="border disabled:cursor-not-allowed p-2 rounded-md dark:bg-black dark:border-gray-500"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <textarea
              className="w-full border-t border-l border-r rounded-t-xl p-2 items-center flex dark:border-gray-500 dark:bg-black"
              rows={6}
              placeholder="Type your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex items-center dark:border-gray-500   border bg-[#f5f5f5] gap-2 rounded-b-xl dark:bg-[#3b3b3b] p-4">
            <div className="flex hover:bg-primary dark:hover:bg-primary hover:text-white transform-all duration-300 cursor-pointer items-center gap-2 bg-white dark:bg-black  dark:border-gray-500 rounded-md p-3 text-gray-500 dark:text-gray-100 ">
              <label htmlFor="fileInput" className="cursor-pointer">
                <Image size={20} className="" />
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChangeImage}
                />
              </label>
            </div>
            <div className="flex hover:bg-primary dark:hover:bg-primary hover:text-white transform-all duration-300 cursor-pointer items-center gap-2 bg-white dark:bg-black  dark:border-gray-500 rounded-md p-3 text-gray-500 dark:text-gray-100 ">
              <label htmlFor="fileInputVideo" className="cursor-pointer">
                <Video size={20} className="" />
                <input
                  id="fileInputVideo"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChangeVideo}
                />
              </label>
            </div>
            <div
              className="flex hover:bg-primary dark:hover:bg-primary hover:text-white transform-all duration-300 cursor-pointer items-center gap-2 bg-white dark:bg-black dark:border-gray-500 rounded-md p-3 text-gray-500 dark:text-gray-100 emoji_picker"
              onClick={() => setShowEmojiPicker(true)}
            >
              <Smile size={20} />
            </div>
            {showEmojiPicker && (
              <div className="absolute ml-[15rem] emoji_picker flex items-center justify-center">
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
            <div className="flex justify-end w-full">
              {attachedFile && (
                <div className="flex gap-4 items-center">
                  <span className="text-sm">{attachedFile.name}</span>
                  <button
                    className="bg-primary text-white p-2 rounded-md"
                    onClick={() => setAttachedFile(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm">Add Tag</label>
          <input
            type="text"
            placeholder="Enter Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border p-2 rounded-md dark:bg-black dark:border-gray-500"
          />
        </div>
        <div className="flex justify-center" onClick={handleClick}>
          <button className="bg-primary hover:bg-[#142065] text-xl text-white rounded-md px-4 py-3 mt-4 transform-all duration-300
          disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800 disabled:hover:bg-gray-400 disabled:hover:text-gray-800
          "
          disabled={buttonClicked}
          >
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
