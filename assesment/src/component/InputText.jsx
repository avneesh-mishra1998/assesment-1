import React from 'react'

function InputText({label,defaultValue,onChange,type}) {
  return (
    <div className="w-full  mb-[20px]">
    <label className="pb-1 inline-block font-semibold">{label}</label>
    <input type={`${type}`} defaultValue={defaultValue} placeholder={label} onChange={onChange}className="bg-[#E9E9E9] w-full py-2 px-3" />
  </div>
  )
}

export default InputText