import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import SignElement from "../components/SignElement";
import axios from 'axios'
import { useNavigate } from "react-router";

export default function SignUp(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonClick, setButtonClick] = useState(false);
    const [userExistText, setUserExistText] = useState('hidden');
    const [invalidText, setInvalidText] = useState('hidden');
    const [accCreatedText, setAccCreatedText] = useState('hidden');
    const navigate = useNavigate();
    
    useEffect(() => {
        if(firstName.length > 0 && lastName.length > 0 && username.length > 5 && password.length > 8){
            if(userExistText === 'hidden'){
                setButtonClick(true);
            }
        }else{
            setButtonClick(false);
        }
    },[firstName,lastName,username,password]);

    async function caller(){
        if(buttonClick){
            await axios.post('http://localhost:3000/user/signUp',{
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password
            }).then((res) => {
                localStorage.setItem('token','Bearer ' + res.data.token);
                setAccCreatedText('block');
                setTimeout(() => {
                    navigate('/Dashboard');
                },2000)
            }).catch((err) => {
                setAccCreatedText('hidden');
                if(err.status == 409){
                    setUserExistText('block');
                }else{
                    setUserExistText('hidden');
                }
                if(err.status == 403){
                    setInvalidText('block');
                }else{
                    setInvalidText('hidden');
                }
            })
            
        }
    }

    return(
        <div className='flex place-content-center bg-black h-screen items-center'>
            <div className="p-4 flex flex-col gap-2 bg-white place-content-center">
                <Heading text={"Sign Up"} />
                <p className="w-80 text-gray-400 font-bold text-center text-md">Enter your information to create an account</p>
                <p className={`text-center text-green-500 font-semibold text-lg ${accCreatedText}`}>Account created successfully!!</p>
                <form className="flex flex-col p-3 gap-2" onSubmit={(e) => e.preventDefault()} >
                    <LabelInput onChange={e => setFirstName(e.target.value)} idName={"firstName"} labelName={"First name"} placeholderName={"John"} inputType={"text"} />
                    <LabelInput onChange={e => setLastName(e.target.value)} idName={"lastName"} labelName={"Last name"} placeholderName={"Doe"} inputType={"text"} />
                    <LabelInput onChange={e => setUsername(e.target.value)} idName={"username"} labelName={"Username"} placeholderName={"JohnDoe123"} inputType={"text"} />
                    <p className={`text-red-600 ${userExistText}`}>*Username exists</p>
                    <LabelInput onChange={e => setPassword(e.target.value)} idName={"password"} labelName={"Password"} placeholderName={"123456"} inputType={"password"} />
                    <Button caller={caller} buttonText={"Sign Up"} />
                    <p className={`text-center text-red-600 font-semibold ${invalidText}`}>Invalid Inputs</p>
                </form>
                <SignElement pText={"Already have an account?"} buttonText={"Sign In"} to={"/"} />
            </div>
        </div>
    )
}
