/* eslint-disable react/prop-types */
import {
  Battery,
  Film,
  Forward,
  Globe,
  Image,
  MessageCircle,
  MessagesSquare,
  Paperclip,
  Search,
  Signal,
  Smile,
  ThumbsUp,
  Video,
  Wifi,
  X,
} from "lucide-react";
import "./Modal.css"
import { MultiSelect } from "primereact/multiselect";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "./style.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Slide, toast } from "react-toastify";
import { BASE_URL } from "./../../../data";
import Cookies from "js-cookie";
import { toastsettings } from "../../../utils/toastsettings";
import Skeleton from "../Skeleton";
const AddCampaign = ({ close }) => {
  const [isMediaAttached, setIsMediaAttached] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [contentType, setContentType] = useState("feed");
  const [uploadStartTime, setUploadStartTime] = useState(null);
  const [uploadEndTime, setUploadEndTime] = useState(null);
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
const handleFileChangeReels = (e) => {
  setContentType("reels");
  const file = e.target.files[0];
  console.log(file)
  const type = file.type.split("/")[0];
  const file_extension = file.name.split(".").pop();
  console.log(file_extension)
  if(file_extension !== "mp4"){
    toast.error("Only mp4 supported", toastsettings);
    return;
  }
  if (file && type === "video") {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const minWidth = 540;
      const minHeight = 960;
      const maxWidth = 1080;
      const maxHeight = 1920;
      const aspectRatio = 9 / 16;
      const durationInSeconds = Math.floor(video.duration);
      if(durationInSeconds<3 || durationInSeconds>90){
        toast.error("Video should be between 3 to 90 seconds.", toastsettings);
        return;
      }
      console.log(durationInSeconds);
      if (
        video.videoWidth >= minWidth &&
        video.videoHeight >= minHeight &&
        video.videoWidth <= maxWidth &&
        video.videoHeight <= maxHeight &&
        Math.abs(video.videoWidth / video.videoHeight - aspectRatio) < 0.01
      ) {
        setAttachedFile(file);
      } else {
        toast.error("Video should be 540x960 to 1080x1920 with 9:16 ratio.", {
          position: "top-right",
          autoClose: 3000,
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
    video.src = URL.createObjectURL(file);
  } else {
    toast.error("Invalid file type", toastsettings);
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
  const handleFileChangeVideo = (e) => {
    setContentType("videos");
    const file = e.target.files[0];
    const type = file.type.split("/")[0];
    console.log(type);
    if (file && type == "video") {
      setAttachedFile(file);
    } else {
      toast.error("Invalid file type", toastsettings);
    }
  }
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
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClick = async () => {
    if ((!campaignName, !selectedCountries, !tag, !content)) {
      toast.error("Enter all fields", toastsettings);
      return;
    }
    const array_data = extractIds(selectedCountries);
    console.log(
      campaignName,
      array_data,
      tag,
      content,
      contentType,
      attachedFile,
      typeof array_data
    );

    try {
      setUploadStartTime(new Date().getTime());
      const toa = toast.loading(
        "Creating Campaign. Do not refresh!",
        toastsettings
      );
      setButtonClicked(true);
      const formData = new FormData();
      formData.append("name", campaignName);
      formData.append("tag", tag);
      formData.append("caption", content);
      formData.append("content_type", contentType);
      if (attachedFile) {
        formData.append("media_file", attachedFile);
      }
      // formData.append('groups', array_data);
      array_data.forEach((item, index) => {
        formData.append(`groups[${index}]`, item);
      });
      const response = await fetch(`${BASE_URL}/campaign/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status === 10000) {
        toast.update(toa, {
          render: data.message,
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
    } catch (error) {
      toast.error("Failed to create campaign", toastsettings);
      console.error("Error creating campaign:", error);
    }
    setButtonClicked(false);
    setUploadEndTime(new Date().getTime());
    console.log("Time taken to upload:", uploadEndTime - uploadStartTime);
  };
  // show upload time
  // create a function getDate and return current time like 9:30 AM
  const getDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // const ampm = hours >= 12 ? "PM" : "AM";
    return `${hours}:${minutes}`;
  };
  return (
    <div className="fixed flex justify-center items-center z-30 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full">
      <div className="flex flex-col sm:flex-row bg-white sm:h-screen w-screen overflow-y-auto">
        <div className="sm:w-[60%] flex gap-4 flex-col p-8 dark:bg-[#3b3b3b] componentScroll">
          <div className="flex justify-between sm:h-[3rem] items-center">
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
              onChange={(e) => {e.preventDefault();setCampaignName(e.target.value)}}
              className="border p-2 rounded-md dark:bg-black dark:border-gray-500"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm w-full">
            <label>Groups</label>
            <MultiSelect
              value={selectedCountries}
              options={countries}
              onChange={(e) => setSelectedCountries(e.value)}
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
            <div className="flex items-center dark:border-gray-500   border bg-[#f5f5f5] gap-2 rounded-b-xl dark:bg-[#3b3b3b] p-4 justify-between">
              <div className="flex gap-2 items-center">
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
                <div className="flex hover:bg-primary dark:hover:bg-primary hover:text-white transform-all duration-300 cursor-pointer items-center gap-2 bg-white dark:bg-black  dark:border-gray-500 rounded-md p-3 text-gray-500 dark:text-gray-100 ">
                  <label htmlFor="fileInputReels" className="cursor-pointer">
                    <Film size={20} className="" />
                    <input
                      id="fileInputReels"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileChangeReels}
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
                <div className="flex text-gray-600 ml-4">
                  <h1 className="flex">Content Type : {contentType}</h1>
                </div>
              </div>

              <div className="flex justify-end ">
                {attachedFile && (
                  <div className="flex gap-4 items-center">
                    <span className="text-sm">{attachedFile.name}</span>
                    <button
                      className="bg-primary text-white p-2 rounded-md"
                      onClick={() => {
                        setAttachedFile(null);
                        setContentType("feed");
                      }}
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
            <button
              className="bg-primary hover:bg-[#142065] text-xl text-white rounded-md px-4 py-3 sm:mt-4 transform-all duration-300
          disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800 disabled:hover:bg-gray-400 disabled:hover:text-gray-800
          "
              disabled={buttonClicked}
            >
              Create Campaign
            </button>
          </div>
        </div>
        <div className="sm:w-[40%] overflow-hidden hidden sm:flex flex-col p-8 items-center gap-4">
          {/* <div className="flex justify-center">
            <button className="p-2 rounded-md bg-primary w-[8rem] text-white">
              Preview
            </button>
          </div> */}
          <div className="flex flex-col gap-6 w-[375px] h-[620px] overflow-hidden bg-gray-100 rounded-xl p-2">
            <div className="flex justify-between px-2">
              <div className="flex">
                <h1 className="font-bold">{getDate()}</h1>
              </div>
              <div className="flex gap-2 font-bold">
                <Signal size={15} strokeWidth={2.4} />
                <Battery size={15} strokeWidth={2.4} />
                <Wifi size={15} strokeWidth={2.4} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="flex">
                  <img
                    className="object-contain"
                    src="/fb-title.png"
                    alt="facebook title"
                    width={150}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex rounded-full p-2 bg-gray-50">
                    <Search size={20} strokeWidth={2.4} />
                  </div>
                  <div className="flex rounded-full p-2 bg-gray-50">
                    <MessageCircle strokeWidth={2.4} size={20} />
                  </div>
                </div>
              </div>
              <hr className="h-8" />
            </div>
            <div className="flex justify-between sm:mt-[-2.5rem]">
              <div className="flex gap-2 items-center">
                <div className="flex">
                  {/* <img src="" generate default avatar image */}
                  <img
                    src="/avatar_placeholder.png"
                    alt="avatar"
                    className="rounded-full"
                    width={50}
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <h1 className="font-semibold">Account Name</h1>
                  <div className="flex gap-1 text-gray-600 items-center">
                    <h1>Just Now</h1>
                    <h1>•</h1>
                    <Globe size={15} strokeWidth={2.4} />
                  </div>
                </div>
              </div>
              <div className="flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ellipsis"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </div>
            </div>
            <div className="flex sm:mt-[-1rem]">
              <h1 className="line-clamp-2">
                {content
                  ? content
                  : "This section will contain the caption of the campaign.Share your thoughts and experiences here!"}
              </h1>
            </div>
            {contentType !== "feed" && (
              <div className="flex justify-center w-auto h-[18rem] sm:mt-[-.5rem]">
                {contentType === "photos" && (
                  <img
                    src={
                      attachedFile
                        ? URL.createObjectURL(attachedFile)
                        : "/imageplaceholder.png"
                    }
                    alt="image"
                    width="auto"
                    className="object-cover"
                  />
                )}
                {contentType === "videos" && (
                  <video
                    src={
                      attachedFile
                        ? URL.createObjectURL(attachedFile)
                        : "https://via.placeholder.com/360"
                    }
                    width="auto"
                    className="object-cover"
                    controls
                  />
                )}
                {contentType === "reels" && (
                  <video
                    src={
                      attachedFile
                        ? URL.createObjectURL(attachedFile)
                        : "https://via.placeholder.com/360"
                    }
                    width="auto"
                    className="reels"
                    controls
                  />
                )}
              </div>
            )}
            <div className="grid grid-cols-3 text-gray-500">
              <div className="flex hover:text-blue-500 justify-center items-center gap-2 cursor-pointer">
                <div className="flex">
                  <ThumbsUp size={20} className="" />
                </div>
                <h1>Like</h1>
              </div>
              <div className="flex justify-center items-center gap-2 cursor-pointer">
                <div className="flex">
                  <MessagesSquare size={20} />
                </div>
                <h1>Comment</h1>
              </div>
              <div className="flex justify-center items-center gap-2 cursor-pointer">
                <div className="flex">
                  <Forward size={20} />
                </div>
                <h1>Share</h1>
              </div>
            </div>
            <div className="flex">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
