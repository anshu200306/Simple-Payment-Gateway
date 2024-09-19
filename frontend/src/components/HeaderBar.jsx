import React, {useState} from "react";
import { useNavigate } from "react-router";
import '../App.css'
import ListElement from "../components/ListElement";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { motion } from 'framer-motion';

export default function HeaderBar({userName, uiClick,bgURL, headingColor='black', navTextColor='gray-500'}){

    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    function caller(){
        localStorage.removeItem('token');
        navigate('/');
    }

    let i = 1;

    const variants = {
        open: { opacity: 1, y: 0, scale: 1},
        closed: { opacity: 0, y: "100%", scale: 0.5 },
    }

    const variants2 = {
        open: {opacity: 1, scale: 1},
        closed: {opacity: 0, scale: 0.2}
    }

    const variants3 = {
        open: {opacity: 1, x: 0},
        closed: {opacity: 0, x: '100%'}
    }

    return(
        <div>
<<<<<<< HEAD
            <div style={{
                backgroundImage: `url('${bgURL}')` ,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }} className="fixed top-0 w-full bg-white flex justify-between px-6 py-6 z-10">
                <Heading text={<span onClick={() => navigate('/Dashboard')} className={`text-${headingColor} cursor-pointer`}>Zen<span className="text-red-600 underline">Pay</span></span>} />
=======
            <motion.div 
                initial={{y: '-50%', opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y:'-50%', opacity: 0}}
                transition={{type: 'spring', delay: 0.2, duration: 1}}
                style={{
                    // backgroundImage: `url('${bgURL}')` ,
                    // backgroundPosition: 'center',
                    // backgroundSize: 'cover',
                    // backgroundRepeat: 'no-repeat'
                    }} 
                className="fixed top-0 w-full flex justify-between px-6 py-6 z-10"
            >
                <Heading text={<span onClick={() => navigate('/Dashboard')} className={`text-${headingColor} cursor-pointer`}>Payments <span className="text-red-600 underline">App</span></span>} />
>>>>>>> b61575f1f44c9018527328ac8c72e32c33d9a731
                <div className="flex gap-4 place-content-center items-center h-full">
                    <p className={`font-semibold text-${navTextColor}`}>Hello, {userName}</p>
                    <button onClick={() => {
                        setIsVisible(true);
                    }} className={`w-8 h-8 rounded-full bg-cyan-200 shadow-md hover:scale-110 transition`}>{userName[0]}</button>
                </div>
            </motion.div>
            <motion.div 
                animate={isVisible? "open" : "closed" }
                variants={variants3}
                transition={{ type: 'tween'}}
                className={`fixed right-0 top-0 w-72 h-screen z-50 bg-white border-2 flex flex-col justify-between`}
            >
                <svg onClick={() => {
                    setIsVisible(false);
                }} className="h-10 w-10 m-1 p-1 rounded-full hover:bg-gray-200 cursor-pointer transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                <div className="flex flex-col h-full items-center gap-2">
                    <div className="flex flex-col place-content-center items-center gap-1">
                        <motion.div 
                            animate={isVisible? "open" : "closed" }
                            variants={variants2}
                            transition={{ type: 'spring', delay: 0.05 }}
                            className={`w-24 h-24 rounded-full flex place-content-center items-center text-4xl bg-cyan-200 shadow-md`}
                        >
                            {userName[0]}
                        </motion.div>
                        <motion.div 
                            initial="initial"
                            whileHover="hovered"
                            animate={isVisible? "open" : "closed" }
                            variants={variants2}
                            transition={{ type: 'spring', delay: 0.05 }}
                            className="relative overflow-hidden w-fit h-8"
                        >
                            <motion.p
                                className="text-xl font-semibold underline"
                            >
                                {userName.split("").map((l,i) => {
                                    return(
                                        <motion.span
                                            variants={{
                                                initial: { y: 0 },
                                                hovered: { y: '-100%' }
                                            }}
                                            transition={{delay: 0.05 * i}}
                                            className="inline-block"
                                            key={i}
                                        >
                                            {l}
                                        </motion.span>
                                    )
                                })}
                            </motion.p>
                            <motion.p
                                className="absolute top-0 text-xl font-semibold underline"
                            >
                                {userName.split("").map((l,i) => {
                                    return(
                                        <motion.span
                                            variants={{
                                                initial: { y: '-100%' },
                                                hovered: { y: 0 }
                                            }}
                                            transition={{delay: 0.05 * i}}
                                            className="inline-block"
                                            key={i}
                                        >
                                            {l}
                                        </motion.span>
                                    )
                                })}
                            </motion.p>
                        </motion.div>
                    </div>
                    <div className="h-full w-full p-2">
                        <ul className="flex flex-col gap-2">
                            <motion.li 
                                animate={isVisible? "open" : "closed" }
                                variants={variants}
                                transition={{ type: 'spring', delay: 0.20 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }} 
                                    style={{ x: 0 }}
                                >
                                    <ListElement caller={() => navigate('/Dashboard')} listType={"Home"} icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>} />
                                </motion.div>
                            </motion.li>
                            <motion.li 
                                animate={isVisible? "open" : "closed" }
                                variants={variants}
                                transition={{ type: 'spring', delay: 0.40}}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{ x: 0 }}
                                >
                                    <ListElement caller={() => navigate('/TransactionHistory')} listType={"Transactions"} icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm48 160l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16l352 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-352 0c-8.8 0-16-7.2-16-16zM376 160l80 0c13.3 0 24 10.7 24 24l0 48c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-48c0-13.3 10.7-24 24-24z"/></svg>} />
                                </motion.div>
                            </motion.li>
                            <motion.li 
                                animate={isVisible? "open" : "closed" }
                                variants={variants}
                                transition={{ type: 'spring', delay: 0.60}}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{ x: 0 }}
                                >
                                    <ListElement 
                                        caller={() => {
                                            uiClick();
                                            setIsVisible(false);
                                        }} 
                                        listType={"UiColor"} icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/></svg>} />
                                </motion.div>
                            </motion.li>
                            <motion.li 
                                animate={isVisible? "open" : "closed" }
                                variants={variants}
                                transition={{ type: 'spring', delay: 0.80}}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}    
                                    whileTap={{ scale: 0.9 }}
                                    style={{ x: 0 }}
                                >
                                <ListElement listType={"Setting"} icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>} />
                                </motion.div>
                            </motion.li>
                        </ul>
                    </div>
                </div>
                <motion.div 
                    animate={isVisible? "open" : "closed" }
                    variants={variants2}
                    transition={{ type: 'spring', delay: 0.05 }}
                    className="w-full p-5"
                >
                    <Button buttonText={"Logout"} caller={caller} />
                </motion.div>
            </motion.div>
        </div>
    )
}