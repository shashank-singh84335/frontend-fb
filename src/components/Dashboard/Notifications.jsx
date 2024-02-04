/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { Bell, X } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { timeAgo } from "../../utils/TimeAgo";
const NotificationItem = ({ update_title, update, timestamp }) => (
  <div className="w-full flex flex-col gap-3 p-3 bg-white dark:bg-black">
    <div className="flex flex-col gap-1">
      <div className="text-gray-500 dark:text-gray-400">
        {update_title}
      </div>
      <div className="font-semibold text-xl text-gray-900 dark:text-white">
        {update}
      </div>
    </div>
    <div className="text-blue-600 dark:text-blue-500">
      {timeAgo(timestamp)}
    </div>
  </div>
);

const Notifications = () => {
  const [openModal, setOpenModal] = useState(false);
//   const [responseData, setResponse] = useState({});
//   useEffect(() => {
//     const fetchData = async () => {
//       const access_token = Cookies.get("access_token");
//       const res = await fetch(`${BASE_URL}/api/view-updates`, {
//         method: "POST",
//         headers: {
//           Accept: "*/*",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//         body: JSON.stringify({
//           update_for_role: "user",
//         }),
//       });
//       const data = await res.json();
//       setResponse(data);
//     };
//     fetchData();
//   }, []);
const responseData = [
  {
    update_title: "Release v1.0",
    update: "This is the initial release of our application.",
    timestamp: "2024-01-25T12:00:00Z",
  },
  {
    update_title: "Bug Fix: Login Issue",
    update: "Resolved a critical bug related to user login.",
    timestamp: "2024-01-26T15:30:00Z",
  },
  {
    update_title: "Feature: Dark Mode",
    update: "Added a new Dark Mode feature for improved user experience.",
    timestamp: "2024-01-27T10:45:00Z",
  },
  {
    update_title: "Security Patch",
    update: "Applied a security patch to address potential vulnerabilities.",
    timestamp: "2024-01-28T08:20:00Z",
  },
  {
    update_title: "Performance Optimization",
    update: "Optimized application performance for faster loading times.",
    timestamp: "2024-01-29T14:00:00Z",
  },
  {
    update_title: "UI Enhancements",
    update: "Made improvements to the user interface based on user feedback.",
    timestamp: "2024-01-30T11:10:00Z",
  },
  {
    update_title: "Bug Fix: Data Sync",
    update: "Fixed a bug related to data synchronization across devices.",
    timestamp: "2024-01-31T09:05:00Z",
  },
  {
    update_title: "Feature: Notifications",
    update: "Added a notification system to keep users informed about updates.",
    timestamp: "2024-02-01T16:30:00Z",
  },
];

  return (
    <div className="">
      <button
        onClick={() => setOpenModal(!openModal)}
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 hover:bg-[#f5f5f5] dark:hover:bg-[#3b3b3b] p-3 rounded-full focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
      >
        <Bell size={20} />
      </button>
      {openModal && (
        <div
          id="popup-modal"
          //   ref={popupRef}
          tabIndex="-1"
          className="fixed flex justify-center items-center  z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50"
        >
          <div
            id="dropdownNotification"
            className="flex flex-col w-[55%] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black dark:divide-gray-700 mt-5"
            aria-labelledby="dropdownNotificationButton"
          >
            <div className="flex justify-between items-center p-5 text-gray-700 rounded-t-lg bg-[#f5f5f5] dark:bg-darkprimary dark:text-white">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <h1 className="text-sm">Get Updates !</h1>
              </div>
              <div className="flex">
                <X size={40} onClick={() => setOpenModal(false)} className="cursor-pointer p-2 hover:bg-primary hover:text-white transform-all duration-300 rounded-full hover:rotate-180" />
              </div>
            </div>
            <div className="divide-y overflow-y-auto componentScroll max-h-[30rem] z-10 divide-gray-100 dark:divide-gray-700">
              {responseData?.map((item, index) => (
                <NotificationItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
