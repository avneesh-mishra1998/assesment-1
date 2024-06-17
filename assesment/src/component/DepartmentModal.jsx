import React from "react";
import { RxCross2 } from "react-icons/rx";
import InputText from "./InputText";
import SelectGroup from "./SelectGroup";
import { FaCamera } from "react-icons/fa";


function DepartmentModal({ successHandler, setModal1 }) {
  return (
    <div className="w-full z-50 min-h-screen flex justify-center items-center bg-black/70 absolute top-0 left-0">
      <div className="relative w-full max-w-[500px] bg-white h-full pt-5 pb-10 px-5 md:px-10 ">
          <span
            className=" absolute top-4 right-6 font-bold text-[26px] cursor-pointer"
            onClick={() => setModal1(false)}
          >
            <RxCross2 />
          </span>

        
          
          <form className="mt-[30px]">
            <div className="md:flex gap-x-[40px]">
              
            <InputText lable="Department Name" type="text" />
            </div>
          
            <div className="mt-[20px] flex justify-center">
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

export default DepartmentModal;
