import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import SignElement from "../components/SignElement";
import axios from 'axios'
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRadiation } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Signing from "../components/signing";

export default function SignUp(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonClick, setButtonClick] = useState(false);
    const [userExistText, setUserExistText] = useState('hidden');
    const [invalidText, setInvalidText] = useState('hidden');
    const [isSigning, setIsSigning] = useState(false);
    const [passText, setPassText] = useState('hidden');
    const [isVisible, setIsVisible] = useState(false);
    const [isSpin, setIsSpin] = useState(true);
    const [iconName, setIconName] = useState(false);
    const [signText, setSignText] = useState('Creating account...');
    const navigate = useNavigate();
    
    useEffect(() => {
        if(firstName.length > 0 && lastName.length > 0 && username.length > 5 && password.length > 8){
            if(userExistText === 'hidden'){
                setButtonClick(true);
            }
        }else{
            setButtonClick(false);
            setPassText('hidden');
        }
    },[firstName,lastName,username,password]);

    async function caller(){
        if(password.length > 0 && password.length < 8) setPassText('block');
        if(buttonClick){
<<<<<<< HEAD
            await axios.post('http://localhost:4000/user/signUp',{
=======
            setPassText('hidden');
            await axios.post('http://localhost:3000/user/signUp',{
>>>>>>> b61575f1f44c9018527328ac8c72e32c33d9a731
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password
            }).then((res) => {
                localStorage.setItem('token','Bearer ' + res.data.token);
                setIsSigning(true);
                setIsVisible(true);
                setTimeout(() => {
                    setIconName(true);
                    setIsSpin(false);
                    setSignText('Account created')
                },2000);
                setTimeout(() => {
                    navigate('/Dashboard');
                },3000)
            }).catch((err) => {
                if(err.status == 409){
                    setIsSigning(false);
                    setUserExistText('block');
                }else{
                    setUserExistText('hidden');
                }
                if(err.status == 403){
                    setIsSigning(false);
                    setInvalidText('block');
                }else{
                    setInvalidText('hidden');
                }
            })
            
        }
    }

    return(
        <div className='flex place-content-center bg-black h-screen items-center'>
            <motion.div
                initial={{y: '-50%', opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: '-50%', opacity:0}}
                transition={{type: 'spring', delay: 0.2, duration: 1}}
                className="p-4 flex flex-col gap-2 bg-white place-content-center"
                style={{
                    boxShadow: "0 0 3px 2px #cec7c759"
                }}    
            >
                <Heading text={"Sign Up"} />
                <p className="w-80 text-gray-400 font-bold text-center text-md">Enter your information to create an account</p>
                {/* <p className={`text-center text-green-500 font-semibold text-lg ${accCreatedText}`}>Account created successfully!!</p> */}
                <form className="flex flex-col p-3 gap-2" onSubmit={(e) => e.preventDefault()} >
                    <LabelInput onChange={e => setFirstName(e.target.value)} idName={"firstName"} labelName={"First name"} placeholderName={"John"} inputType={"text"} />
                    <LabelInput onChange={e => setLastName(e.target.value)} idName={"lastName"} labelName={"Last name"} placeholderName={"Doe"} inputType={"text"} />
                    <LabelInput onChange={e => setUsername(e.target.value)} idName={"username"} labelName={"Username"} placeholderName={"JohnDoe123"} inputType={"text"} />
                    <p className={`text-red-600 ${userExistText}`}>*Username exists</p>
                    <LabelInput onChange={e => setPassword(e.target.value)} idName={"password"} labelName={"Password"} placeholderName={"123456"} inputType={"password"} />
                    {isSigning ? signing({faCircleRadiation}) : signIn({caller})}
                    <p className={`text-center text-red-600 font-semibold ${invalidText}`}>*Invalid Inputs</p>
                    <p className={`text-center text-red-600 font-semibold ${passText}`}>*Password should be atleast 9 digits</p>
                </form>
                <SignElement pText={"Already have an account?"} buttonText={"Sign In"} to={"/"} />
            </motion.div>
            <Signing isVisible={isVisible} iconName={iconName} isSpin={isSpin} signText={signText} />
        </div>
    )
}

function signing({faCircleRadiation}){
    return(
        <Button hover=" " buttonText={<span className="text-gray-300">Signing up... <FontAwesomeIcon color="light-gray" icon={faCircleRadiation} spin /></span>}/>
    )
}

function signIn({caller}){
    return(
        <Button caller={caller} buttonText={"Sign Up"}/>
    )
}
