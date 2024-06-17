import React from "react";
import { RxCross2 } from "react-icons/rx";
import InputText from "./InputText";
import SelectGroup from "./SelectGroup";
import { FaCamera } from "react-icons/fa";


function EmployeeModal({ successHandler, setModal1 }) {
  return (
    <div className="w-full z-50 min-h-screen flex justify-center items-center bg-black/70 absolute top-0 left-0">
      <div className="relative w-full max-w-[500px] bg-white h-full pt-5 pb-5 px-3 md:px-6 ">
          <span
            className=" absolute top-5 right-6 font-bold text-[26px] cursor-pointer"
            onClick={() => setModal1(false)}
          >
            <RxCross2 />
          </span>

        
          
          <form className="mt-[30px]">
            <div className="flex justify-between gap-x-[20px]">
              <div className="w-full">
              <InputText lable="Name" type="text" />
              <InputText lable="Email" type="email" />
              </div>
              <div className="w-full">
              <InputText lable="Location" type="text" />
              <InputText lable="Password" type="password" />
              </div>
             
            </div>
          
            <div className="mt-[30px] flex justify-center">
              <button
                className="bg-blue-500 py-3 min-w-[140px] rounded-sm uppercase text-white font-medium"
                onClick={(e) => successHandler(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default EmployeeModal;
