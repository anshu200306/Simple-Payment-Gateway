import React, { useEffect, useState } from "react";
import LabelInput from "../components/LabelInput";
import axios from "axios";
import UserComp from "../components/UserComp";
import { useNavigate } from "react-router";
import '../App.css'
import HeaderBar from "../components/HeaderBar";
import { motion } from 'framer-motion';

export default function Dashboard(){

    const [balance, setBalance] = useState();
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [sideBar, setSideBar] = useState('hidden opacity-0');
    const [colorHide, setColorHide] = useState('hidden');
    const [bodyOpacity, setBodyOpacity] = useState('');
    const [uiColorChange, setUiColorChange] = useState('bg-cyan-100');
    const navigate = useNavigate();
    const bgURL = 'https://plus.unsplash.com/premium_photo-1667575290693-947d839451e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    useEffect(() => {
        axios.get('http://localhost:3000/user/bulk?filter=' + search ,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((res) => {
            if(res.status === 200){
                setUsers(res.data.user);
                setUserName(res.data.firstName);
            }
        }).catch((err) => {
            if(err) navigate('/');
        });
    },[search])

    useEffect(() => {
        axios.get('http://localhost:3000/account/balance',{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            if(res.status == 200) setBalance(Math.floor(res.data.balance));
        })
    },[])

    let yellow = 'bg-yellow-200';
    let purple = 'bg-purple-300';
    let cyan = 'bg-cyan-100';
    let orange = 'bg-orange-300';
    let green = 'bg-green-400';
    let red = 'bg-red-400';

    function colorChange(color){
        setBodyOpacity('');
        setColorHide('hidden');
        setUiColorChange(`${color}`);
    }

    function uiClick(){
        navigate('/Dashboard');
        setBodyOpacity('opacity-50');
        setColorHide('block');
        setSideBar('hidden');
    }

    let i = 1;

    return(
        <div style={{
                backgroundImage: "url('https://plus.unsplash.com/premium_photo-1667575290693-947d839451e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" ,
                backgroundPosition: 'center',
                backgroundSize: 'fit',
                backgroundRepeat: 'no-repeat'
            }} className="relative min-h-screen overflow-hidden">
            <div className={`absolute h-full w-full z-50 border-white flex place-content-center items-center ${colorHide}`}>
                <div className={`flex fixed place-content-center items-center justify-around w-9/12 h-14 rounded-full bg-black p-6 text-white`}>
                    <div onClick={() => colorChange(yellow)} className={`w-8 h-8 rounded-full ${yellow} cursor-pointer hover:scale-105 transition border-2 border-white`}></div>
                    <div onClick={() => colorChange(purple)} className={`w-8 h-8 rounded-full ${purple} cursor-pointer hover:scale-105 transition border-2 border-white`}></div>
                    <div onClick={() => colorChange(cyan)} className={`w-8 h-8 rounded-full ${cyan} cursor-pointer hover:scale-105 transition border-2 border-white`}></div>
                    <div onClick={() => colorChange(green)} className={`w-8 h-8 rounded-full ${green} cursor-pointer hover:scale-105 transition border-2 border-white`}></div>
                    <div onClick={() => colorChange(orange)} className={`w-8 h-8 rounded-full ${orange} cursor-pointer hover:scale-105 transition border-2 border-white`}></div>
                    <div onClick={() => colorChange(red)} className={`w-8 h-8 rounded-full ${red} cursor-pointer hover:scale-105 transition border-2 border-white`}></div>
                </div>
            </div>
            <HeaderBar userName={userName} uiClick={uiClick} bgURL={bgURL} headingColor="white" navTextColor="gray-200"/>
            <div className={`h-screen flex flex-col p-2 gap-4 ${bodyOpacity}`}>
                <h1 className="font-bold text-xl mt-24 px-4 hover:underline cursor-pointer w-fit text-gray-100">Your Balance: Rs {balance}</h1>
                <div className="flex flex-col gap-2 px-4">
                    <LabelInput onChange={(e) => setSearch(e.target.value)} idName={"searchUsers"} inputType={"text"} labelName={"Users:"} placeholderName={"Search users..."} color="text-gray-100" />
                </div>
                <motion.div
                    className="flex flex-col w-full px-5 overflow-x-hidden overflow-y-scroll">
                        {users.map((data) => {
                            if(!(data.firstName == userName)){
                                return(
                                    <motion.div
                                        initial={{ opacity: 0 , scale: 0.5 }}
                                        animate={{ opacity: 1 , scale: 1 }}
                                        exit={{ opacity: 0 , scale: 0.5 }}
                                        transition={{ type: 'spring', delay: 0.15 * i++}}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 1 }}            
                                            style={{ x: 0 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <UserComp key={data._id} userName={data.firstName} lastName={data.lastName} userId={data._id} uiColor={uiColorChange} />
                                        </motion.div>
                                    </motion.div>
                                )  
                            } 
                        })}
                </motion.div>
            </div>
        </div>
    )
}