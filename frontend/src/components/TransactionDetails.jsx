import React from "react";

export default function TransactionDetails({date,sendTo,amount}){

    return(
        <div className="border-2 p-4 flex flex-col gap-14 bg-gray-600 text-gray-200">
            <section className="tracking-wider">{date}</section>
            <section className="tracking-widest flex flex-col gap-2">
                <p className=""><u>Send To</u>: <span>{sendTo}</span></p>
                <p className=""><u>Amount</u>: {amount}</p>
            </section>
        </div>
    )
}