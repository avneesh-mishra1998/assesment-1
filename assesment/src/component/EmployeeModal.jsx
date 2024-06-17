import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import InputText from "./InputText";
import { useUpdateEmpMutation } from "../store/api/userApi";

const EmployeeModal = ({ updateId, successHandler, setModal1, modalType }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  // const [createEmployee] = useCreateEmpMutation();
  const [updateEmployee] = useUpdateEmpMutation();

  useEffect(() => {
    if (modalType === "edit" && updateId.empData.full_name) {
      setName(updateId.empData.full_name);
      setEmail(updateId.empData.email);
      setLocation(updateId.empData.location);
      // setPassword(updateId.empData.password || "");
    } else {
      setName("");
      setEmail("");
      setLocation("");
      // setPassword("");
    }
  }, [updateId, modalType]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (modalType === "edit") {
      await updateEmployee({ id: updateId?.id, data: { fullName:name, email, location } });
    } else {
      // await createEmployee({ name, email, location, password });
    }
    successHandler(e);
  };

  return (
    <div className="w-full z-50 min-h-screen flex justify-center items-center bg-black/70 absolute top-0 left-0">
      <div className="relative w-full max-w-[500px] bg-white h-full pt-5 pb-5 px-3 md:px-6">
        <span
          className="absolute top-5 right-6 font-bold text-[26px] cursor-pointer"
          onClick={() => setModal1(false)}
        >
          <RxCross2 />
        </span>
        <form className="mt-[30px]" onSubmit={formSubmitHandler}>
          <div className="flex justify-between gap-x-[20px]">
            <div className="w-full">
              <InputText label="Name" type="text" defaultValue={updateId?.empData?.full_name} value={name} onChange={(e) => setName(e.target.value)} />
              <InputText label="Email" type="email" defaultValue={updateId?.empData?.email} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="w-full">
              <InputText label="Location" type="text" defaultValue={updateId?.empData?.location} value={location} onChange={(e) => setLocation(e.target.value)} />
              {/* <InputText label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            </div>
          </div>
          <div className="mt-[30px] flex justify-center">
            <button className="bg-blue-500 py-3 min-w-[140px] rounded-sm uppercase text-white font-medium">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
