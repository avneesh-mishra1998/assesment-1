import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import InputText from "./InputText";
import SelectGroup from "./SelectGroup";
import { FaCamera } from "react-icons/fa";
import { useApproveEmpMutation } from "../store/api/userApi";


function ApproveModal({ successHandler, emp,  setModal1 }) {
  const [depId, setDepId] = useState(0);
  // const getData = (id) => {
  //   setDepId(id)
  // }
  const [approve] = useApproveEmpMutation()
  const submitHandler = async (id) => {
    // e.preventDefault();
    console.log(depId,id);
    await approve({dep_id:depId, emp_id: id})
    successHandler()
    setModal1(false)
  }

  const handleGetId = async(data)=>{
    console.log(data);
    setDepId(data);
  }
  return (
    <div className="w-full z-50 min-h-screen flex justify-center items-center bg-black/70 absolute top-0 left-0">
      <div className="relative w-full max-w-[400px] bg-white h-full pt-5 pb-10 px-5 md:px-10 ">
          <span
            className=" absolute top-5 right-6 font-bold text-[26px] cursor-pointer"
            onClick={() => setModal1(false)}
          >
            <RxCross2 />
          </span>

          <h3 className="text-center text-2xl font-semibold">
           Approve Employee
          </h3>
          
          <form className="mt-[30px]">
            <div className="gap-x-[40px] w-full">
              <InputText defaultValue={emp.data.full_name} label="Enter Name" type="text" />
              <InputText defaultValue={emp.data.email} label="Enter Email" type="text" />
              <SelectGroup  handleGetId={handleGetId}/>
            </div>
          
            <div className="mt-[40px] flex justify-center">
              <button
                className="bg-blue-500 py-3 min-w-[140px] rounded-sm uppercase text-white font-medium"
                onClick={() => submitHandler(emp.data.id)}
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default ApproveModal;
