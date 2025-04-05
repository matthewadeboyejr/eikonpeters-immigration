"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Breadcrumb = ({ prevPage, currentPage }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="w-full mb-5 ">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleBack}
                className="ms-1 text-sm font-medium text-yellow-500"
              >
                {prevPage}
              </button>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-[#333333] md:ms-2">
                {currentPage}
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
