import React from "react";
import { LuSearch } from "react-icons/lu";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

import Table1 from "../component/Table1";


function ManageUser() {
  return (
    <div>
      {/* <div className="flex flex-wrap gap-3 justify-between mb-3">
        <div className="flex flex-wrap gap-3 md:gap-4">
          <div className="relative w-full sm:w-[250px]">
            <input className="text-[12px] pl-10 w-full border !border-[#DBE6FF] h-10 px-4 py-3 focus:ring-0 focus:outline-none" type="text" placeholder="Search by user name, user ID,mail ID" />
            <span className="top-1/2 absolute left-3 text-[20px] -translate-y-1/2 text-[#0080FF]">
              <LuSearch />
            </span>
          </div>
          <button className="text-[#ffffff] flex-1 sm:flex-none bg-[#0080FF] px-4 md:px-5 py-1 rounded-sm text-[14px]">Create User</button>
        </div>
        <div className="flex w-full sm:w-auto flex-wrap justify-between md:justify-end items-center  gap-3 md:gap-4">
        <button className="text-[#ffffff] flex-1 sm:flex-none bg-[#0080FF] px-4 md:px-5 py-2 rounded-sm text-[14px]">Create User</button>
        </div>
      </div> */}

      {/* User table show here */}
       <Table1 />
    </div>
  );
}

export default ManageUser;
