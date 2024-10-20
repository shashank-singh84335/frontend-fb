import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../utils/Context";
import { LoaderIcon } from "lucide-react";

// eslint-disable-next-line react/prop-types
const ReportsTable = ({ data, onLoadMore, meta }) => {
  const navigate = useNavigate();
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
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[10%]">
                ID
              </th>
              <th className="py-5 text-left uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
                Name
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
                Metrics
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[20%]">
                Top Metric
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[15%]">
                Start Date
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[15%]">
                End Date
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[15%]">
                State
              </th>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[15%]">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-[#f5f6fa] dark:hover:bg-darkprimary cursor-pointer duration-300 transform-all"
                onClick={() => {}}
              >
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[10%] text-center">
                  {item.id}
                </td>
                <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[20%]">
                  {item.name}
                </td>
                <td
                  className="py-5 truncate px-4 border-b dark:border-b-gray-600 max-w-[20%] text-center"
                  title={item.metrics.join("\n")}
                >
                  {/*  Only show items allowed in width */}
                  {item.metrics.length > 1
                    ? item.metrics.slice(0, 1).join(", ") + "..."
                    : item.metrics.join(", ")}
                </td>
                <td className="py-5 truncate px-4 border-b dark:border-b-gray-600 w-[20%] text-center">
                  {item.top_metric || "-"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[15%] text-center">
                  {item.start_date || "-"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[15%] text-center">
                  {item.end_date || "-"}
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[15%] text-center">
                  <h1
                    className={`p-2 rounded-md font-bold ${
                      item.state === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : item.state === "available"
                        ? "bg-green-200 text-green-800"
                        : item.state === "failed"
                        ? "bg-red-200 text-red-800"
                        : ""
                    }`}
                  >
                    {item.state}
                  </h1>
                </td>
                <td className="py-5 px-4 border-b dark:border-b-gray-600 w-[15%] text-center">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Download
                    </a>
                  ) : (
                    <a
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-200 text-white rounded-md cursor-not-allowed"
                    >
                      Download
                    </a>
                  )}
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
      {/* Uncomment the Pagination if needed */}
      {/* <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
    </div>
  );
};

export default ReportsTable;
