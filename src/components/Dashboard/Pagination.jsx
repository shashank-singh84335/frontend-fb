/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { usePagination, DOTS } from "./UsePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slide, toast } from "react-toastify";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
      setValue(currentPage + 1);
    } else {
      toast.error("Invalid Page Number", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setValue(currentPage - 1);
    } else {
      toast.error("Invalid Page Number", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  const [value, setValue] = useState(1);
  // return (
  //   <ul
  //     className="flex justify-center items-center w-full py-4 gap-2"
  //   >
  //     <li
  //       className="cursor-pointer"
  //       onClick={onPrevious}
  //     >
  //       <div className="arrow left" />
  //     </li>
  //     {paginationRange.map(pageNumber => {
  //       if (pageNumber === DOTS) {
  //         return <li className="cursor-pointer">&#8230;</li>;
  //       }
  //       return (
  //         <li
  //           className="cursor-pointer bg-primary text-white h-10 w-8 flex items-center justify-center rounded-md"
  //           onClick={() => onPageChange(pageNumber)}
  //           key={pageNumber}
  //         >
  //           {pageNumber}
  //         </li>
  //       );
  //     })}
  //     <li
  //       className={classNames('pagination-item', {
  //         disabled: currentPage === lastPage
  //       })}
  //       onClick={onNext}
  //     >
  //       <div className="arrow right" />
  //     </li>
  //   </ul>
  // );
  const handleDirectPageChange = () => {
    if (value <= lastPage && value >= 1) {
      onPageChange(value);
    } else {
      toast.error("Invalid Page Number", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };
  return (
    <div className="flex sm:flex-row flex-col justify-between mt-2 items-center gap-2">
      <div className="flex gap-1">
        <h1>Showing</h1>
        <h1>{currentPage}</h1>
        <h1>of</h1>
        <h1>{lastPage}</h1>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-2">
          <input
            type="text"
            className="w-[11rem] ps-4 flex items-center justify-center h-10 rounded-md border-2 focus:outline-none"
            value={value}
            min={1}
            max={3}
            placeholder="Enter Page Number"
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="p-2 rounded- bg-[#fff] rounded-md tranform-all duration-300 hover:bg-primary hover:text-white"
            onClick={handleDirectPageChange}
          >
            Go
          </button>
        </div>
        <div className="flex gap-1">
          <button
            className="bg-[#fff] flex justify-center items-center p-1 rounded-md"
            onClick={onPrevious}
          >
            <ChevronLeft />
          </button>
          <button
            className="bg-[#fff] flex justify-center items-center p-1 rounded-md"
            onClick={onNext}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
