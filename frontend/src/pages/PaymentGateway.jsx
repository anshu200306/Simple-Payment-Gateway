import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { idTranfer, sendToLstNm, sendToName } from "../stateManagement/TransferId";
import { useNavigate } from "react-router";

export default function PaymentGateway(){

    const [amount, setAmount] = useState(0);
    const receiversName = useRecoilValue(sendToName);
    const receiversLastName = useRecoilValue(sendToLstNm);
    const [amountText, setAmountText] = useState('hidden');
    const [aukaatText, setAukaatText] = useState('hidden');
    const [successText, setSuccessText] = useState('hidden');
    const id = useRecoilValue(idTranfer);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/user/bulk',{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((res) => {
            
        }).catch((err) => {
            if(err) navigate('/');
        });
        
    },[])

    useEffect(() => {
        if(amount > 0) setAmountText('hidden');
    },[amount])

    function caller(){
        
        if(amount > 0){
            axios.post('http://localhost:3000/account/transfer',{
                to: `${id}`,
                amount: parseInt(amount)
            },{
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            .then((res) => {
                if(res.status == 200){
                    setSuccessText('block');
                    setTimeout(() => {
                        navigate('/dashboard');
                    },2000);
                }
            }).catch((err) => {
                if(err.status == 400){
                    setAukaatText('block');
                }
            })
        }else{
            setAmountText('block');
        }
    }

    return(
        <div className='relative flex place-content-center bg-black h-screen items-center'>
            <div className={`absolute p-8 z-50 w-80 flex flex-col gap-5 bg-white opacity-90 rounded-xl place-content-center border-2 ${aukaatText}`}>
                <Heading text={"Saale aukaat m rahle😒😒"}/>
                <Button caller={() => setAukaatText('hidden')} buttonText={"Ok"} />
            </div>
            <div className={`absolute p-8 z-50 w-80 flex flex-col gap-5 bg-white opacity-90 rounded-xl place-content-center border-2 ${successText}`}>
                <Heading text={"Transfer Successful"}/>
            </div>
            <div className={`p-8 w-96 flex flex-col gap-2 bg-white rounded-xl place-content-center`}>
                <Heading text={"Send Money"}/>
                <div className="flex gap-3 mt-8 items-center">
                    <p className="w-12 h-12 p-2 rounded-full flex place-content-center items-center bg-green-500 text-white font-semibold text-xl">{receiversName[0]}</p>
                    <h2 className="text-2xl font-bold">{receiversName} {receiversLastName}</h2>
                </div>
                <LabelInput onChange={(e) => setAmount(e.target.value)} idName={"amount"} inputType={"number"} labelName={"Amount (in Rs)"} placeholderName={"Enter amount"} />
                <Button caller={caller} buttonText={"Initiate Transfer"} />
                <p className={`text-red-600 ${amountText}`}>*Enter amount</p>
            </div>
        </div>
    )
}
