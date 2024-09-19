import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import SignElement from "../components/SignElement";
import axios from "axios";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleRadiation, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Signing from "../components/signing";

export default function SignIn(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notExistText, setNotExistText] = useState('');
    const [passIncorrect, setPassIncorrect] = useState('hidden');
    const [buttonClick, setButtonClick] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [signText, setSignText] = useState('You are signing in...');
    const [iconName, setIconName] = useState(false);
    const [isSpin, setIsSpin] = useState(true);
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
        axios.get('http://localhost:3000/user/bulk',{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((res) => {
            if(res.status === 200){
                navigate('/dashboard');
            }
        }).catch()
    },[])

    async function caller(){

        if(buttonClick){
            setNotExistText('');
            setPassIncorrect('hidden');
            await axios.post('http://localhost:3000/user/signIn',{
                username,
                password
            }).then((res) => {
                localStorage.setItem('token',"Bearer " + res.data.token);
                setIsSigning(true);
                setIsVisible(true);
                setTimeout(() => {
                    setIsSpin(false);
                    setSignText('You are signed in');
                    setIconName(faCheckCircle);
                }, 2000)
                setTimeout(() => {
                    setIsSigning(false);
                    navigate('/dashboard');
                },3000)
            }).catch((err) => {
                if(err.status == 404){
                    setIsSigning(false);
                    setNotExistText("User doesn't exist");
                }else{
                    setNotExistText('');
                }
                if(err.status == 400){
                    setIsSigning(false);
                    setPassIncorrect('block');
                }else{
                    setPassIncorrect('hidden');
                }
            })
            
        }
    }

    return(
        <div className='relative flex place-content-center bg-black h-screen items-center overflow-hidden'>
            <motion.div 
                initial={{y: '-50%', opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y:'-50%', opacity: 0}}
                transition={{type: 'spring', delay: 0.2, duration: 1}}
                className="p-4 flex flex-col gap-2 bg-white place-content-center"
            >
                <Heading text={"Sign In"} />
                <p className="w-80 text-gray-400 font-bold text-center text-md">Enter your credentials to access your account</p>
                <form className="flex flex-col p-3 gap-2" onSubmit={(e) => e.preventDefault()}>
                    <p className={`text-center text-red-600 font-semibold`}>{notExistText}</p>
                    <LabelInput onChange={e => setUsername(e.target.value)} idName={"username"} inputType={"text"} labelName={"Username"} placeholderName={"JohnDoe1234"} />
                    <LabelInput onChange={e => setPassword(e.target.value)} idName={"password"} inputType={"password"} labelName={"Password"} placeholderName={"123456"} />
                    {isSigning ? signing({faCircleRadiation}) : signIn({caller})}
                    <p className={`text-red-500 font-semibold ${passIncorrect}`}>*Password is incorrect</p>
                </form>
                <SignElement pText={"Don't have an account?"} buttonText={"Sign Up"} to={"/signUp"} />
            </motion.div>
            <Signing isVisible={isVisible} isSpin={isSpin} iconName={iconName} signText={signText} />
        </div>
    )
}

function signing({faCircleRadiation}){
    return(
        <Button hover=" " buttonText={<span className="text-gray-300">Signing in... <FontAwesomeIcon color="light-gray" icon={faCircleRadiation} spin /></span>}/>
    )
}

function signIn({caller}){
    return(
        <Button caller={caller} buttonText={"Sign In"}/>
    )
}