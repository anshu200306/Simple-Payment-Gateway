import React from "react";
import { Link } from 'react-router-dom'

export default function SignElement({pText,buttonText,to}){
    return(
        <div className="flex place-content-center text-gray-800 font-semibold gap-2">
            <p>{pText}</p>
            <Link to={to}><button className="underline font-bold hover:text-gray-500 hover:no-underline">{buttonText}</button></Link>
        </div>
    )
}