import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import HeaderBar from "../components/HeaderBar";
import Heading from "../components/Heading";
import { motion } from "framer-motion";

export default function TransactionHistory(){

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [transferInfo, setTransferInfo] = useState([]);
    const [noHistory, setNoHistory] = useState('hidden');

    useEffect(() => {
        axios.get('http://localhost:3000/user/transactionHistory',{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((res) => {
            if(res.status === 200){
                setUserName(res.data.firstName);
                setTransferInfo(res.data.history);
                if(res.data.history.length == 0) setNoHistory('block');
                else setNoHistory('hidden');
            }
        })
        .catch((err) => {
            if(err) navigate('/');
        });

    },[])

    let i = 0;

    return(
        <div className={`h-screen w-full bg-white flex flex-col`}>
            <HeaderBar userName={username} />
            <div className="text-black border-t-2 border-gray-200 mt-24 p-4 flex flex-col">
                <Heading text={<u>Transaction History</u>} />
                <div className="relative w-full h-auto p-4 rounded-xl mt-10 grid grid-cols-3 gap-4">
                    <div className={`absolute ${noHistory} w-full text-center flex place-content-center p-4 top-1/2 text-2xl font-semibold tracking-wider`}>
                        <h1 className="p-4 text-3xl w-fit border-b-2 text-gray-700">No Transaction Found!!</h1>
                    </div>
                    {transferInfo.map((data) => {
                        if(data.amount < 0) {
                            return (
                                <motion.div
                                    initial={{ opacity: 0 , scale: 0.5 }}
                                    animate={{ opacity: 1 , scale: 1 }}
                                    exit={{ opacity: 0 , scale: 0.5 }}
                                    transition={{ type: 'spring', delay: 0.15 * i++}}
                                >
                                    <Sender date={data.date} sendTo={data.sendTo} amount={data.amount} />
                                </motion.div>
                            )
                        }else{
                            return (
                                <motion.div
                                    initial={{ opacity: 0 , scale: 0.5 }}
                                    animate={{ opacity: 1 , scale: 1 }}
                                    exit={{ opacity: 0 , scale: 0.5 }}
                                    transition={{ type: 'spring', delay: 0.15 * i++}}
                                >
                                    <Receiver date={data.date} receivedFrom={data.receivedFrom} amount={data.amount} />
                                </motion.div>
                            )
                        }
                    })}
                </div>
            </div>

        </div>
    )
}

function Sender({date,sendTo,amount}){
    return(
        <div className="border-2 p-4 flex flex-col gap-14 bg-red-600 text-gray-200">
            <section className="tracking-wider">{date}</section>
            <section className="tracking-widest flex flex-col gap-2">
                <p className=""><u>Send To</u>: <span>{sendTo}</span></p>
                <p className=""><u>Amount</u>: {amount}</p>
            </section>
        </div>
    )
}

function Receiver({date,receivedFrom,amount}){
    return(
        <div className="border-2 p-4 flex flex-col gap-14 bg-green-600 text-gray-200">
            <section className="tracking-wider">{date}</section>
            <section className="tracking-widest flex flex-col gap-2">
                <p className=""><u>Received from</u>: <span>{receivedFrom}</span></p>
                <p className=""><u>Amount</u>: {amount}</p>
            </section>  
        </div>
        
    )
}