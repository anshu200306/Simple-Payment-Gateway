import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner,faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Signing({isVisible, iconName, isSpin, signText}){

    const variants = {
        open: {opacity: 1, y: 0},
        close: {opacity: 0, y: '100%'}
    }

    return(
        <motion.div
            animate={isVisible ? "open" : "close"} 
            variants={variants}
            transition={{type: 'spring', delay: 0.2}}
            className={`absolute bg-white bottom-8 right-10 px-12 py-2 rounded-lg flex place-content-center items-center gap-2 ${isVisible? 'block' : 'hidden'}`}
            >
            <p className="text-blue-600 text-lg font-semibold">{signText}</p>
            <FontAwesomeIcon size="lg" icon={iconName ? faCheckCircle : faSpinner} color="blue" spin={isSpin} />
        </motion.div>
    )
}