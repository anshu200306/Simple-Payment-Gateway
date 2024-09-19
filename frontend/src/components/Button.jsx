import React from "react";

export default function Button({buttonText, caller, hover="hover:scale-105"}){
    return(
        <button onClick={caller} className={`p-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 ${hover} transition`}>{buttonText}</button>
    )
}