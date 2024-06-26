import React, { useState, useEffect } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import ApproveModal from "./ApproveModal";
import {useGetAllEmpQuery } from "../store/api/userApi";


function Table1() {
  const [emp, setEmp] = useState({id:0, data: {}})
  const [employees, setEmployees] = useState([]);
  const employeeData = useGetAllEmpQuery()
  const [modal1, setModal1] = useState(false);
  // Add pagination
  const [page, setPage] = useState(1);
  const limit = 7;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(employees.length / limit);
  const currentData = employees.slice(skip, skip + limit);

  useEffect(() => {
    if (employeeData.isError) {
      console.error("Error fetching data:", employeeData.error);
    } else if (employeeData?.data?.status) {
      setEmployees(employeeData.data.data.read_emp);
    }
  }, [employeeData]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  // Iteration pagination number
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-2 rounded ${
            i === page ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  const successHandler = () => {
    setTimeout(() => {
      setModal1(false);
    }, 500);
  };

  const approveHandler = (id, data) => {
    setEmp({id:id, data: data})
    setModal1(true)
  }

  // API call to reject employee
  const rejectHandler = (id) => {
    
  }

  return (
    <div>
    <div className="shadow-sm overflow-x-auto overflow-y-hidden">
      <table className="w-full border-separate border-spacing-y-1">
        <thead>
          <tr className="bg-[#DBE6FF]">
          <th className="p-3 py-2 text-[14px] font-semibold w-[5%] min-w-[60px] text-left">
              ID
            </th>
          
            <th className="p-3 py-2 text-[14px] font-semibold text-left w-[20%] min-w-[200px]">
              Name
            </th>
            <th className="p-3 py-2 text-[14px] font-semibold text-left w-[20%] min-w-[200px]">
             Email
            </th>
           
            <th className="p-3 py-2 text-[14px] font-semibold text-left w-[30%] min-w-[200px]">
             Address
            </th>
            <th className="p-3 py-2 text-[14px] font-semibold text-left rounded-e-sm w-[20%] min-w-[200px]">
             Action
            </th>
          </tr>
        </thead>
        <tbody className="text-[14px] font-semibold">
          {currentData.map((item) => (
            <tr className="bg-white shadow-md" key={item.employeeId}>
              <td className="p-3">{item.id}</td>

              <td className="p-3">
                  <span>{item.full_name}</span>
              </td>
              <td className="p-3">{item.email}</td>
              <td className="p-3">{item.location}</td>
              <td className="p-3 rounded-s-md">
                <div className="flex gap-x-2">
                  <button onClick={()=>approveHandler(item.id, item)} className="text-white px-4 bg-green-600  py-1 rounded-sm text-[12px]" >
                   Approve
                  </button>
                  <button onClick={()=>rejectHandler(id)} className="text-[#fff] px-2 bg-red-500  px-2 py-1 rounded-sm text-[12px]">
                   Reject
                  </button>
                
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>


    {modal1 && (
        <ApproveModal successHandler={successHandler} emp={emp} setModal1={setModal1} />
      )}
    <div className="flex justify-end gap-x-3 md:gap-x-5 items-center mt-5 mb-2">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-2 md:px-4 py-1 bg-blue-500 text-white rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaAnglesLeft />
        </button>
        <div className="flex space-x-1">{renderPaginationButtons()}</div>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-2 md:px-4 py-1 bg-blue-500 text-white rounded ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
         <FaAnglesRight />
        </button>
      </div>
    </div>
  );
}

export default Table1;
