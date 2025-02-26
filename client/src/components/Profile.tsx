import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { AnimatePresence, motion } from 'framer-motion'
import axios from "axios"


const Profile = () => {
    const navigator = useNavigate();

    const Logout = async () => {
        try{
            await axios.get("/server/auth/logout");
        }catch(err){
            console.log('Logout without Login');
            console.log(err);
        }finally{
            navigator('/');
        }
    }

    return (
        <>
        <DropDown>
            <DropDownContent onLogout={Logout} />
        </DropDown> 
        </>
    )
}

const DropDown = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative" onMouseEnter={() => { setOpen(true) }} onMouseLeave={() => { setOpen(false) }} >
            <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center absolute top-8 right-6 md:right-12 md:h-10 md:w-10">
                <p className="text-lg font-lato font-semibold md:text-xl">A</p>
            </div>
            { open && (
                <>
                { children }
                </>
            ) }
        </div>
    )
}

const DropDownContent = ({ onLogout }) => {
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0
         }} className="p-1 flex flex-col gap-1 flex- absolute top-[4.5rem] right-4 h-fit w-24 rounded-md bg-gray-700 md:w-36 md:right-12">
                <Link to="/account"><button className="font-montserrat text-sm  md:text-lg">Account</button></Link>
                <button onClick={onLogout} className="text-left font-montserrat text-sm  md:text-lg">Logout</button>
        </motion.div>
        </AnimatePresence>
    )
}

export default Profile;
