/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DataTable = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto border-2 dark:border-gray-600 rounded-2xl w-full">
      <table className="min-w-full bg-white dark:bg-black">
        <thead>
          <tr>
            <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[33%]">
              ID
            </th>
            <th className="py-5 text-center uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[33%]">
              Pages Name
            </th>
            <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[33%]">
              State
            </th>
            {/* <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
              Post Date
            </th> */}
            {/* <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
              Tag
            </th> */}
            {/* <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
              Status
            </th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={index}
              //   className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              //   className="hover:bg-[#f5f6fa] dark:hover:bg-darkprimary cursor-pointer duration-300 transform-all"
            >
              <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[33%] text-center">
                {item.id}
              </td>
              <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[33%] text-center">
                {item.name}
              </td>
              <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[33%] text-center">
                <h1
                  className={`p-2 ${
                    item.status == "success"
                      ? "bg-[#ccf0eb] text-[#00B69B]"
                      : "bg-[#e0d4fc] text-[#6226EF]"
                  } rounded-md font-bold`}
                >
                  {item.status}
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
