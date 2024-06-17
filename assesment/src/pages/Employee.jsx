import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import EmployeeTable from "../component/EmplyeeTable";

function Employee() {
  const [modal1, setModal1] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [updateId, setUpdateId] = useState({ id: 0, empData: {} });
  const [searchText,setSearchText] = useState("");
  const [searchName,setSearchName] = useState("");
  const [asc, setAsc] = useState(true);

  const handleCreateClick = () => {
    setModalType("create");
    setUpdateId({ id: 0, empData: {} });
    setModal1(true);
  };
  const handleSearchLocation=(e)=>{
    const value = e.target.value;
    setSearchText(value);
  }

  const handleSearchName=(e)=>{
    const value = e.target.value;
    setSearchName(value);
  }

  const handleToggleSort = () => {
    setAsc((prevAsc) => !prevAsc);
  };



  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between mb-3">
        <div className="flex flex-wrap gap-3 md:gap-4">
          <div className="relative w-full sm:w-[250px]">
            <input
              className="text-[12px] pl-10 w-full border !border-[#DBE6FF] h-10 px-4 py-3 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Search by Location"
              onChange={handleSearchLocation}
              value={searchText}
            />

            <span className="top-1/2 absolute left-3 text-[20px] -translate-y-1/2 text-[#0080FF]">
              <LuSearch />
            </span>
           
          </div>
          <div className="relative w-full sm:w-[250px]">
            <input
              className="text-[12px] pl-10 w-full border !border-[#DBE6FF] h-10 px-4 py-3 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Search by name"
              onChange={handleSearchName}
              value={searchName}
            />

            <span className="top-1/2 absolute left-3 text-[20px] -translate-y-1/2 text-[#0080FF]">
              <LuSearch />
            </span>
           
          </div>
          <div>
            <button onClick={handleToggleSort} className="text-[#ffffff] flex-1 sm:flex-none bg-[#0080FF] px-4 md:px-5 py-1 rounded-sm text-[14px]"  >
              {asc ? "Asc" : "Desc"}
            </button>
          </div>
        </div>
        <div className="flex w-full sm:w-auto flex-wrap justify-between md:justify-end items-center gap-3 md:gap-4">
          <button onClick={handleCreateClick} className="text-[#ffffff] flex-1 sm:flex-none bg-[#0080FF] px-4 md:px-5 py-2 rounded-sm text-[14px]">
            Create Employee
          </button>
        </div>
      </div>
      <EmployeeTable modal1={modal1} setModal1={setModal1} modalType={modalType} setModalType={setModalType} updateId={updateId} setUpdateId={setUpdateId} searchText={searchText} searchName={searchName} asc={asc}/>
    </div>
  );
}

export default Employee;
