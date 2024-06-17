import React, { useState, useEffect } from 'react';
import {useGetAllDepQuery} from "../store/api/depApi"



const SelectGroup = ({handleGetId}) => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [dep, setDep] = useState([]);
  const department = useGetAllDepQuery();

  useEffect(() => {
    if (department.isError) {
      console.error("Error fetching data:", department.error);
    } else if (department?.data?.status) {
      setDep(department.data.data.read_dep);
    }
    // refetch();
  }, [department]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    handleGetId(value);
    console.log(value,'valka');
    if (value && !selectedGroups.includes(value)) {
      setSelectedGroups([...selectedGroups, value]);
    }
  };

  const handleRemoveGroup = (group) => {
    setSelectedGroups(selectedGroups.filter(g => g !== group));
  };

  return (
    <div className="w-full">
      <label className="block font-semibold mb-1">Department</label>
      <select
        className="block w-full p-2 bg-[#E9E9E9] focus:outline-none focus:border-none rounded-md "
        onChange={handleSelectChange}
        value=""
      >
        <option value="">Select Department</option>
        {dep.map(option => (
          <option key={option.id} value={option.id}>{option.depName}</option>
        ))}
      </select>
      <div className="flex flex-wrap gap-2">
        {selectedGroups.map(group => (
          <div key={group} className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md">
            {group}
            <button
              className="ml-2 text-white"
              onClick={() => handleRemoveGroup(group)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectGroup;
