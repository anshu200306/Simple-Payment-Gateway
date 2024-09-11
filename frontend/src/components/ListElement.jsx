import React from "react";

export default function({listType,icon,caller}){

    return(
        <li onClick={caller} className="border-t-2 border-b-2 flex place-content-center gap-1 items-center cursor-pointer border-cyan-100 text-center text-lg font-semibold tracking-wider p-3 rounded-xl hover:scale-105 bg-white hover:bg-cyan-100 transition opacity-80 hover:shadow-xl hover:opacity-100">{icon} {listType}</li>
    )
}