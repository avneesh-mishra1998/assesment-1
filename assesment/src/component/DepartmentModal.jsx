import React, { useEffect, useState } from "react";
import { useCreateDepMutation, useDeleteDepMutation, useUpdateDepMutation } from "../store/api/depApi";

const DepartmentModal = ({ updateId, successHandler, setModal1, modalType }) => {
  const [depName, setDepName] = useState("");
  const [createDepartment] = useCreateDepMutation();
  const [updateDepartment] = useUpdateDepMutation();

  useEffect(() => {
    if (modalType === "edit" && updateId.depData.depName) {
      setDepName(updateId.depData.depName);
    } else {
      setDepName("");
    }
  }, [updateId, modalType]);
  console.log(updateId)

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(depName);
    console.log(e)
    // debugger
    // if()
    if(modalType === 'edit'){
      console.log(updateId?.id)
      const formData = {
        depName:depName,
        id:updateId?.id
      }
      let res = await updateDepartment(formData);
      successHandler(e);

    }else{
      let res = await createDepartment(depName);
      successHandler(e);
    }
    // Handle update or create logic here based on modalType
  };

  return (
    <div className="w-full z-50 min-h-screen flex justify-center items-center bg-black/70 absolute top-0 left-0 cursor-pointer">
      <div className="relative w-full max-w-[500px] bg-white h-full pt-5 pb-10 px-5 md:px-10">
        <div></div>
        <span className="absolute top-4 right-6 font-bold text-[26px] cursor-pointer" onClick={() => setModal1(false)}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className="mt-[30px]">
          <div className=" gap-x-[40px]">
            <label className="flex flex-col">
              Department Name
              <input
                type="text"
                defaultValue={updateId?.depData?.depName}
                value={depName}
                onChange={(e) => setDepName(e.target.value)}
                className="border p-2"
              />
            </label>
          </div>
          <div className="mt-[20px] flex justify-center">
            <button type="submit" className="bg-blue-500 py-3 min-w-[140px] rounded-sm uppercase text-white font-medium">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;
