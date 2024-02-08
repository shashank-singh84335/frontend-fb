/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../utils/Context";

// eslint-disable-next-line react/prop-types
const DataTable = ({ data }) => {
  const navigate=useNavigate()
    const { state, setState } = useAppState();

  return (
    <div className="overflow-x-auto border-2 dark:border-gray-600 rounded-2xl w-full">
      <table className="min-w-full bg-white dark:bg-black">
        <thead>
          <tr>
            <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
              ID
            </th>
            <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
              Group Name
            </th>
            {/* <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
              Time
            </th> */}
            <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
              Total Pages
            </th>
            <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
              Date
            </th>
            {/* <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
              Tag
            </th> */}
            <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={index}
              //   className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              className="hover:bg-[#f5f6fa] dark:hover:bg-darkprimary cursor-pointer duration-300 transform-all"
              onClick={() => {
                localStorage.setItem("group_name", item.name);
                setState("specificGroup");
                navigate(`/dashboard/${item.id}`);
              }}
            >
              <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[20%] text-center">
                {item.id}
              </td>
              <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[20%]">
                {item.name}
              </td>
              {/* <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] ">
                {item.group_name ? item.group_name : "N/A"}
              </td> */}
              <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[20%] text-center">
                {item.total_pages ? item.total_pages : "N/A"}
              </td>
              <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[20%] text-center">
                {item.date ? item.date : "N/A"}
              </td>
              {/* <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                {item.tag ? item.tag : "N/A"}
              </td> */}
              <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[20%] text-center">
                <h1
                  className={`p-2  
                  bg-[#ccf0eb] text-[#00B69B]
                   rounded-md font-bold`}
                >
                  {item.state}
                  {/* Healthy */}
                </h1>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
