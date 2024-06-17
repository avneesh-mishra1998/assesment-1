import React from 'react'

function InputText({lable,type}) {
  return (
    <div className="w-full  mb-[20px]">
    <label className="pb-1 inline-block font-semibold">{lable}</label>
    <input type={`${type}`} className="bg-[#E9E9E9] w-full py-2 px-3" />
  </div>
  )
}

export default InputText