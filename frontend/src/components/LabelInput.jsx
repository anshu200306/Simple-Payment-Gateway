import React from "react";

export default function LabelInput({idName,inputType,labelName,placeholderName,onChange,color="text-black"}){
    return(
        <div className="flex flex-col mb-1">
            <label htmlFor={idName} className={`font-bold w-fit ${color}`}>{labelName}</label>
            <input onChange={onChange} id={idName} type={inputType} placeholder={placeholderName} className="border-2 p-1.5 rounded-lg mt-1" />
        </div>
    )
}