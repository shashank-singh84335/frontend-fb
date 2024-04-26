/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from 'lucide-react';
// table for view all top pages
const AnalyticsLandingTopPages = ({ data, onLoadMore,meta }) => {
  if(!data) return;
  if (data.length === 0) return;
  console.log(meta,data.length)
  // meta = total 
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const fetchTableHeaders = () => {
      if (!data) {
        return;
      }
      const a = [];
      const first = data[0].mertics;
      console.log(first);
      for (let i = 0; i < first.length; i++) {
        if(first[i].label!==""){
          a.push(first[i].label);
        }
        else{
          a.push(first[i].metric);
        }
      }
      setArr(a);
    };
    fetchTableHeaders();
  }, [data]);
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
      <div className="overflow-x-auto border-2 dark:border-gray-600 rounded-2xl w-full">
        <table className="min-w-full bg-white dark:bg-black overflow-y-scroll">
          <thead>
            <tr>
              <th className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600 w-[12.5%]">
                Account / Page Information
              </th>
              {arr.map((item, index) => (
                <th
                  key={index}
                  className="py-5 uppercase text-sm px-4 border-b dark:border-b-gray-600"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                className="text-sm hover:bg-[#f5f6fa] dark:hover:bg-darkprimary cursor-pointer duration-300 transform-all "
                key={index}
              >
                <td className="px-4 py-4 w-[12.5%] border-b dark:border-b-gray-600">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <p className="font-semibold">{item?.account_name}</p>
                      <p className="text-xs text-gray-400">{item?.page_name}</p>
                    </div>
                  </div>
                </td>
                {item.mertics.map((metric, index) => (
                  <td
                    key={index}
                    className="px-4 w-[12.5%] py-4 border-b dark:border-b-gray-600"
                  >
                    {metric.value}
                  </td>
                ))}
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

export default AnalyticsLandingTopPages;
