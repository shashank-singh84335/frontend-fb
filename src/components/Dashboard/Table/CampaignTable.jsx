/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../utils/Context";
import { LoaderIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
const DataTable = ({ data, onLoadMore,meta }) => {
  console.log(data.length,meta)
  const tableRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
    );

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => {
      if (tableRef.current) {
        observer.unobserve(tableRef.current);
      }
    };
  }, [onLoadMore]);
  const navigate = useNavigate();
  const { setState } = useAppState();
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="overflow-x-auto border-2 dark:border-gray-600 rounded-2xl w-full min-h-screen">
        <table className="min-w-full bg-white dark:bg-black overflow-y-auto">
          <thead>
            <tr>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                ID
              </th>
              <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                Name
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                Pending
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                Success
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[5%]">
                Failed
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                Start Date
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                End Date
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                Tag
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                //   className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                className="text-sm hover:bg-[#f5f6fa] dark:hover:bg-darkprimary cursor-pointer duration-300 transform-all"
                onClick={() => {
                  navigate(`/dashboard/${item.id}`);
                  setState("specificCampaign");
                  localStorage.setItem("campaign_name", item.name);
                }}
              >
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[10%] text-center">
                  {item?.id ? item?.id : "N/A"}
                </td>
                <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[10%]">
                  {item?.name ? item?.name : "N/A"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[10%] text-center">
                  {item?.pending ? item?.pending : "0"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[10%] text-center">
                  {item?.success ? item?.success : "0"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[10%] text-center">
                  {item?.failed ? item?.failed : "0"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[15%] text-center">
                  {item?.start_date ? item?.start_date : "N/A"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[10%] text-center">
                  {item?.end_date ? item?.end_date : "N/A"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[10%] text-center">
                  <h1 className="line-clamp-1">
                    {item?.tag ? item?.tag : "N/A"}
                  </h1>
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[20%] text-center">
                  <h1
                    className={`p-2 ${
                      item?.state === "completed"
                        ? "bg-[#ccf0eb] text-[#00B69B]"
                        : item?.state === "pending"
                        ? "bg-[#e0d4fc] text-[#6226EF]"
                        : "bg-[#fcd7d4] text-[#ef3826]"
                    } rounded-md font-bold`}
                  >
                    {item?.state ? item?.state : "N/A"}
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
    </div>
  );
};

export default DataTable;
