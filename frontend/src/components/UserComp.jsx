import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useRecoilState } from "recoil";
import { idTranfer, sendToName, sendToLstNm } from "../stateManagement/TransferId";

export default function UserComp({userName,userId,lastName,uiColor}){

    const [sendersName,setSendersName] = useRecoilState(sendToName);
    const [id,setId] = useRecoilState(idTranfer);
    const [sendersLastName, setSendersLastName] = useRecoilState(sendToLstNm);

    function caller(){
        setSendersName(userName);
        setSendersLastName(lastName);
        setId(userId);
        console.log(userId);
    }

    return(
        <div className="flex justify-between place-content-center items-center rounded-xl transition hover:bg-opacity-40 hover:bg-gray-900 p-2 hover:scale-105">
            <div className="flex place-content-center items-center gap-4">
                <p className={`w-10 h-10 rounded-full ${uiColor} shadow-md flex place-content-center items-center`}>{userName[0]}</p>
                <h1 className="font-bold text-xl text-gray-100">{userName} {lastName}</h1>
            </div>
            <div className="flex place-content-center items-center">
                <Link to={'/transfer'}><Button caller={caller} buttonText={"Send Money"} /></Link>
            </div>
        </div>
    )
}