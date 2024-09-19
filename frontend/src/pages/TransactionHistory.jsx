import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import HeaderBar from "../components/HeaderBar";
import Heading from "../components/Heading";
import TransactionDetails from "../components/TransactionDetails";

export default function TransactionHistory(){

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [transferInfo, setTransferInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/user/transactionHistory',{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((res) => {
            if(res.status === 200){
                setUserName(res.data.firstName);
                setTransferInfo(res.data.history);
            }
        })
        .catch((err) => {
            if(err) navigate('/');
        });
    },[])

    return(
        <div className={`h-screen w-full bg-white flex flex-col`}>
            <HeaderBar userName={username} />
            <div className="text-black border-t-2 border-gray-200 mt-24 p-4 flex flex-col">
                <Heading text={<u>Transaction History</u>} />
                <div className="border-2 w-full h-auto p-4 mt-10 grid grid-cols-3 gap-4">
                    {transferInfo.map((data) => {
                        return <TransactionDetails key={data.sendTo} date={data.date} sendTo={data.sendTo} amount={data.amount}/>
                    })}
                </div>
            </div>

        </div>
    )
}