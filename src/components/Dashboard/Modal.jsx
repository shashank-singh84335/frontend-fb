/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import  { useState } from 'react'
import { FACEBOOK_REDIRECT_URL } from '../../data.js';
import Cookies from 'js-cookie';

const Modal = ({ modalHeading , close }) => {
  const [appID, setAppID] = useState("")
  const [appSecret, setAppSecret] = useState("")
  const [other_name, setOther_name] = useState("")
  const performClick = () => {
    Cookies.set("other_name",other_name);
    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appID}&redirect_uri=${
      FACEBOOK_REDIRECT_URL
    }/dashboard/&scope=pages_show_list, pages_read_user_content, pages_manage_engagement, pages_manage_posts, pages_read_engagement, publish_video,read_insights&response_type=token&state=${appID},${appSecret}`;
}
  return (
    <div
      id="popup-modal"
      //   ref={popupRef}
      tabIndex="-1"
      className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white dark:bg-black rounded-lg shadow ">
          <button
            onClick={close}
            type="button"
            className="absolute top-3 right-2.5 text-gray-500"
            data-modal-hide="popup-modal"
          >
            <X
              size={40}
              className="cursor-pointer p-2 hover:bg-primary hover:text-white transform-all duration-300 rounded-full hover:rotate-180"
            />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 "
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
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            <h3 className="mb-5 text-xl dark:text-gray-300 text-gray-600">
              {modalHeading}
            </h3>
            <input
              type="text"
              value={appID}
              onChange={(e) => setAppID(e.target.value)}
              placeholder="Enter App ID"
              className=" block w-[100%] p-3 pl-10 text-sm text-gray-900 rounded-md bg-[#f5f5f5] dark:bg-[#26282a] outline-none"
              required
            />
            <input
              type="text"
              value={appSecret}
              onChange={(e) => setAppSecret(e.target.value)}
              placeholder="Enter App Secret"
              className=" block w-[100%] dark:bg-[#26282a] p-3 pl-10 text-sm text-gray-900 rounded-md bg-[#f5f5f5] mt-4 outline-none"
              required
            />
            <input
              type="text"
              value={other_name}
              onChange={(e) => setOther_name(e.target.value)}
              placeholder="Add Other Name"
              className=" block w-[100%] dark:bg-[#26282a] p-3 pl-10 text-sm text-gray-900 rounded-md bg-[#f5f5f5] mt-4 outline-none"
              required
            />
            <button
              onClick={performClick}
              className="bg-primary mt-4  p-3 w-[8rem] text-[#e5e5e5] rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal