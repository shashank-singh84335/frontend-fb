/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../utils/Context";
import Pagination from "../Pagination";
import { LoaderIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
const DataTable = ({ data,onLoadMore,meta }) => {
  const navigate=useNavigate()
  const { setState } = useAppState();
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
    <div className="flex flex-col gap-2 w-full">
      <div className="overflow-x-auto border-2 dark:border-gray-600 rounded-2xl w-full min-h-screen overflow-y-auto">
        <table className="min-w-full bg-white dark:bg-black">
          <thead>
            <tr>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[5%]">
                ID
              </th>
              <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
                Name
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
                Total Pages
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
                Other Name
              </th>
              {/* <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
              State
            </th> */}
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[19%]">
                User ID
              </th>
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
                className="hover:bg-[#f5f6fa] dark:hover:bg-darkprimary cursor-pointer duration-300 transform-all"
                // onClick={()=>navigate(`/dashboard/campaign/${item.campaign_id}`)}
                onClick={() => {
                  localStorage.setItem("account_name", item.name);
                  setState("specificAccount");
                  navigate(`/dashboard/${item.id}`);
                }}
              >
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[5%] text-center">
                  {item.id}
                </td>
                <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[19%]">
                  {item.name}
                </td>
                <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                  {item.total_page ? item.total_page : "-"}
                </td>
                <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                  {item.other_name ? item.other_name : "-"}
                </td>
                {/* <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                {item.state}
              </td> */}
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                  {item.user_id}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[19%] text-center">
                  <h1
                    className={`p-2 bg-[#ccf0eb] text-[#00B69B] rounded-md font-bold`}
                  >
                    {item.state}
                    {/* Healthy */}
                  </h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.length !== meta && (
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
      {/*<Pagination*/}
      {/*    className="pagination-bar"*/}
      {/*    currentPage={currentPage}*/}
      {/*    totalCount={data.length}*/}
      {/*    pageSize={PageSize}*/}
      {/*    onPageChange={(page) => setCurrentPage(page)}*/}
      {/*  />*/}
    </div>
  );
};

export default DataTable;
