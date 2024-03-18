/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertTimestamp } from "../../../utils/formatTime";
import Pagination from "../Pagination";
import { LoaderIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
const DataTable = ({ data,onLoadMore, meta }) => {
    const tableRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onLoadMore();
      }
    });

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => {
      if (tableRef.current) {
        observer.unobserve(tableRef.current);
      }
    };
  }, [onLoadMore]);
  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="overflow-x-auto border-2 dark:border-gray-600 rounded-2xl w-full min-h-screen">
        <table className="min-w-full bg-white dark:bg-black">
          <thead>
            <tr>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[5%]">
                ID
              </th>
              <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
                Name
              </th>
              <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
                Account
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
                Post Date
              </th>
              {/* <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
              Tag
            </th> */}
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                //   className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                //   className="hover:bg-[#f5f6fa] dark:hover:bg-darkprimary cursor-pointer duration-300 transform-all"
              >
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[5%] text-center">
                  {item.id ? item.id : "N/A"}
                </td>
                <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[19%]">
                  {item?.name ? item?.name : "N/A"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] ">
                  {item?.account_name ? item?.account_name : "N/A"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                  {item?.post_date ? item?.post_date : "N/A"}
                </td>
                {/* <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                {item?.tag}
              </td> */}
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                  <h1
                    className={`p-2 ${
                      item?.state === "success"
                        ? "bg-[#ccf0eb] text-[#00B69B]"
                        : item?.state === "pending"
                        ? "bg-[#e0d4fc] text-[#6226EF]"
                        : "bg-[#fcd7d4] text-[#ef3826]"
                    } rounded-md font-bold`}
                  >
                    {item?.state}
                  </h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length !== meta && (
          <section
            className="flex justify-center items-center w-full h-20"
            ref={tableRef}
          >
            <LoaderIcon
              size={32}
              className="animate-spin text-primary dark:text-primary"
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default DataTable;
