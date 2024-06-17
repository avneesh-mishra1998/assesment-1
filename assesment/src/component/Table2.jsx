import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { data } from "./data3";
import {useCreateDepMutation, useGetAllDepQuery, useGetDepByIdQuery, useDeleteDepMutation} from "../store/api/depApi"
import DepartmentModal from "./DepartmentModal";


function Table2({modal1,setModal1}) {

  const [dep, setDep] = useState([])
  const department = useGetAllDepQuery({ refetchOnMountOrArgChange: true })
  const [createDep] = useCreateDepMutation()
  const [deleteDep] = useDeleteDepMutation();
  const location = useLocation();

  console.log("===>",department);
  // useEffect(()=>{
  //   if(location?.state?.data){
  //     console.log(location?.state?.data)
  //     setDep(location?.state?.data)
  //   }
  // },[location?.state]);

  useEffect(() => {
    if (department.isError) {
      console.error('Error fetching data:', department.error);
    } else if (department?.data?.status) {
      setDep(department.data.data.read_dep);
    }
  }, [department.data]);

  const depDeleteHandler = async(id) => {
    await deleteDep(id)
    setModal1(true)
  }

  // Add pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(dep.length / limit);
  const currentData = dep.slice(skip, skip + limit);
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

  const successHandler = (e) => {
    e.preventDefault()
    setTimeout(() => {
      setModal1(false);
    }, 0);
  };


  return (
    <div>
      <div className="shadow-sm overflow-x-auto overflow-y-hidden">
        <table className="w-full border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-[#DBE6FF]">
              <th className="p-3 py-2 text-[14px] font-semibold w-[35%] min-w-[60px] text-left">
                ID
              </th>
              <th className="p-3 py-2 text-[14px] font-semibold text-left w-[40%] min-w-[200px]">
                Department Name
              </th>
            

              <th className="p-3 py-2 text-[14px] font-semibold text-left rounded-e-sm w-[25%] min-w-[200px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-[14px] font-semibold">
            {currentData.map((item) => (
              <tr className="bg-white shadow-md" key={item.employeeId}>
                <td className="p-3">{item.id}</td>
                <td className="p-3">
                  <span>{item.depName}</span>
                </td>
               
               
                <td className="p-3 rounded-s-md">
                  <div className="flex gap-x-2">
                    <button onClick={()=>depDeleteHandler(item.id)} className="text-white px-4 bg-green-600  py-1 rounded-sm text-[12px]">
                      Edit
                    </button>
                    <button className="text-[#fff] px-2 bg-red-500  px-2 py-1 rounded-sm text-[12px]">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal1 && (
        <DepartmentModal successHandler={successHandler} setModal1={setModal1} />
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

export default Table2;
