import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import SignElement from "../components/SignElement";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SignIn(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notExistText, setNotExistText] = useState('');
    const [passIncorrect, setPassIncorrect] = useState('hidden');
    const [buttonClick, setButtonClick] = useState(false);
    const [loginText, setLoginText] = useState('hidden');
    const navigate = useNavigate();

    useEffect(() => {
        if(username.length == 0 || password.length == 0){
            setNotExistText('');
            setPassIncorrect('hidden');
        }
        if(username.length > 0 && password.length > 0){
            setButtonClick(true);
        }else{
            setButtonClick(false);
            setNotExistText('');
            setPassIncorrect('hidden');
        }
    },[username,password]);

    useEffect(() => {
        axios.get('http://localhost:4000/user/bulk',{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((res) => {
            if(res.status === 200){
                navigate('/dashboard');
            }
        })
    },[])

    async function caller(){

        if(buttonClick){
            setNotExistText('');
            setPassIncorrect('hidden');
            await axios.post('http://localhost:4000/user/signIn',{
                username,
                password
            }).then((res) => {
                setLoginText('block');
                localStorage.setItem('token',"Bearer " + res.data.token);
                setTimeout(() => {
                    navigate('/dashboard');
                },2000)
            }).catch((err) => {
                if(err.status == 404){
                    setNotExistText("User doesn't exist");
                }else{
                    setNotExistText('');
                }
                if(err.status == 400){
                    setPassIncorrect('block');
                }else{
                    setPassIncorrect('hidden');
                }
            })
            
        }

    }

    return(
        <div className='flex place-content-center bg-black h-screen items-center'>
            <div className="p-4 flex flex-col gap-2 bg-white place-content-center">
                <Heading text={"Sign In"} />
                <p className="w-80 text-gray-400 font-bold text-center text-md">Enter your credentials to access your account</p>
                <form className="flex flex-col p-3 gap-2" onSubmit={(e) => e.preventDefault()}>
                    <p className={`text-center text-red-600 font-semibold`}>{notExistText}</p>
                    <p className={`text-center text-green-500 font-semibold text-lg ${loginText}`}>Login successfull!!</p>
                    <LabelInput onChange={e => setUsername(e.target.value)} idName={"username"} inputType={"text"} labelName={"Username"} placeholderName={"JohnDoe1234"} />
                    <LabelInput onChange={e => setPassword(e.target.value)} idName={"password"} inputType={"password"} labelName={"Password"} placeholderName={"123456"} />
                    <Button caller={caller} buttonText={"Sign In"}/>
                    <p className={`text-red-500 font-semibold ${passIncorrect}`}>*Password is incorrect</p>
                </form>
                <SignElement pText={"Don't have an account?"} buttonText={"Sign Up"} to={"/signUp"} />
            </div>
        </div>
    )
}