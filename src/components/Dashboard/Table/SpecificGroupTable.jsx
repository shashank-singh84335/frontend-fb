/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { LoaderIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
const DataTable = ({ data,onLoadMore,meta }) => {
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
      <div className="overflow-x-auto border-2 dark:border-gray-600 rounded-2xl w-full min-h-screen">
        <table className="min-w-full bg-white dark:bg-black">
          <thead>
            <tr>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
                ID
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 text-left w-[60%]">
                Pages Name
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
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
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[20%] text-center">
                  {item.id}
                </td>
                <td className="py-5 text-left truncate px-4 border-b dark:border-b-gray-600 w-[60%]">
                  {item.name}
                </td>
                <td className="py-5 text-center px-4 border-b dark:border-b-gray-600 w-[20%] ">
                  <h1
                    className={`p-2 ${
                      item.status == "success"
                        ? "bg-[#ccf0eb] text-[#00B69B]"
                        : "bg-[#e0d4fc] text-[#6226EF]"
                    } rounded-md font-bold `}
                  >
                    {item.state}
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
      {/*<Pagination*/}
      {/*   className="pagination-bar"*/}
      {/*   currentPage={currentPage}*/}
      {/*   totalCount={data.length}*/}
      {/*   pageSize={PageSize}*/}
      {/*   onPageChange={(page) => setCurrentPage(page)}*/}
      {/* />*/}
    </div>
  );
};

export default DataTable;
