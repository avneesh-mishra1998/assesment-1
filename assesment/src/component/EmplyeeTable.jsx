import React, { useState, useEffect } from "react";
// import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa";
// import {  useGetAllEmpQuery, useDeleteEmpMutation, useUpdateEmpMutation } from "../store/api/userApi";
import EmployeeModal from "./EmployeeModal";
import { useDeleteEmpMutation, useGetAllEmpByNameMutation, useGetAllEmpQuery, useGetEmpByLocationMutation } from "../store/api/userApi";

function EmployeeTable({ modal1, setModal1, modalType, setModalType, updateId, setUpdateId, searchText,searchName,asc}) {
  const [employees, setEmployees] = useState([]);
  const employeeData = useGetAllEmpQuery();
  // const employeeData = useGetAllEmpQuery({ refetchOnMountOrArgChange: true });
  const [deleteEmp] = useDeleteEmpMutation();
  const [page, setPage] = useState(1);
  const limit = 7;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(employees.length / limit);
  const currentData = employees.slice(skip, skip + limit);

  const [getEmpByLocation] = useGetEmpByLocationMutation();
  const [getEmpByName] = useGetAllEmpByNameMutation();



  useEffect(() => {
    if (employeeData.isError) {
      console.error("Error fetching data:", employeeData.error);
    } else if (employeeData?.data?.status) {
      setEmployees(employeeData.data.data.read_emp);
    }
  }, [employeeData]);


  useEffect(()=>{
    if(searchText !== ""){
       async function callgetByLocationApi(){
        let body = {
          asc:true,
          location:searchText
        }
          let res =await getEmpByLocation(body);
          console.log(res);
          setEmployees(()=>res?.data?.data?.filter_emp)
      }
    callgetByLocationApi();
    }
    if(searchName !==""){
      async function callgetByLocationApi(){
        let body = {
          asc:true,
          name:searchName
        }
          let res =await getEmpByName(body);
          console.log(res);
          setEmployees(()=>res?.data?.data?.filter_emp)
      }
      callgetByLocationApi();
    }
      async function callgetByLocationApi(){
        let body = {
          asc:asc,
          location:searchText
        }
          let res =await getEmpByLocation(body);
          console.log(res);
          setEmployees(()=>res?.data?.data?.filter_emp)
      }
    callgetByLocationApi();
  },[searchText,searchName,asc])

  const empDeleteHandler = async (id) => {
    await deleteEmp(id);
    employeeData?.refetch();
    successHandler()
  };

  const editHandler = (id, empData) => {
    setUpdateId({ id: id, empData: empData });
    setModalType("edit");
    setModal1(true);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-2 rounded ${i === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const successHandler = (e) => {
    e.preventDefault();
    employeeData.refetch();
    setModal1(false);
  };

  return (
    <div>
      <div className="shadow-sm overflow-x-auto overflow-y-hidden">
        <table className="w-full border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-[#DBE6FF]">
              <th className="p-3 py-2 text-[14px] font-semibold w-[20%] min-w-[60px] text-left">ID</th>
              <th className="p-3 py-2 text-[14px] font-semibold text-left w-[20%] min-w-[200px]">Name</th>
              <th className="p-3 py-2 text-[14px] font-semibold text-left w-[20%] min-w-[200px]">Email</th>
              <th className="p-3 py-2 text-[14px] font-semibold text-left w-[20%] min-w-[200px]">Location</th>
              <th className="p-3 py-2 text-[14px] font-semibold text-left rounded-e-sm w-[20%] min-w-[200px]">Action</th>
            </tr>
          </thead>
          <tbody className="text-[14px] font-semibold">
            {employees.map((item) => (
              <tr className="bg-white shadow-md" key={item.id}>
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.full_name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3 rounded-s-md">
                  <div className="flex gap-x-2">
                    <button onClick={() => editHandler(item.id, item)} className="text-white px-4 bg-green-600 py-1 rounded-sm text-[12px]">Edit</button>
                    <button onClick={() => empDeleteHandler(item.id)} className="text-[#fff] px-2 bg-red-500 py-1 rounded-sm text-[12px]">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal1 && (
        <EmployeeModal updateId={updateId} successHandler={successHandler} setModal1={setModal1} modalType={modalType} />
      )}
      <div className="flex justify-end gap-x-3 md:gap-x-5 items-center mt-5 mb-2">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-2 md:px-4 py-1 bg-blue-500 text-white rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {/* <FaAnglesLeft /> */}
        </button>
        <div className="flex space-x-1">{renderPaginationButtons()}</div>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-2 md:px-4 py-1 bg-blue-500 text-white rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {/* <FaAnglesRight /> */}
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;
