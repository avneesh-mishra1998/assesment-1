import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Table2 from "../component/Table2";

function Department() {
    const [modal1, setModal1] = useState(false);
  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between mb-3">
        <div className="flex flex-wrap gap-3 md:gap-4">
          <div className="relative w-full sm:w-[250px]">
            <input
              className="text-[12px] pl-10 w-full border !border-[#DBE6FF] h-10 px-4 py-3 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Search by user name, user ID,mail ID"
            />
            <span className="top-1/2 absolute left-3 text-[20px] -translate-y-1/2 text-[#0080FF]">
              <LuSearch />
            </span>
          </div>
          <button className="text-[#ffffff] flex-1 sm:flex-none bg-[#0080FF] px-4 md:px-5 py-1 rounded-sm text-[14px]">
            Search
          </button>
        </div>
        <div className="flex w-full sm:w-auto flex-wrap justify-between md:justify-end items-center  gap-3 md:gap-4">
          <button onClick={()=>setModal1(true)}  className="text-[#ffffff] flex-1 sm:flex-none bg-[#0080FF] px-4 md:px-5 py-2 rounded-sm text-[14px]">
            Create Department
          </button>
        </div>
      </div>
      <Table2 modal1={modal1} setModal1={setModal1} />
    </div>
  );
}

export default Department;
