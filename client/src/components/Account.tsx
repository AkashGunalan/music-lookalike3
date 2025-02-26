import axios from "axios";
import { useEffect, useState } from "react";

interface User{
    email: string, 
    logged: boolean
}

const Account = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try{
                const res = await axios.get("/server/auth/session", { withCredentials: true } );
                const user = res.data.user;

                if(user.logged)
                    setUser(user)
            }catch(err){
                console.log('Unauthorized', err);
            }
        }

        getUser();
    }, []);

    return (
        <div className="h-screen flex justify-center items-center bg-background">
            <h2 className="text-white">{user ? user.email : "Not Logged in.."}</h2>
        </div>
    )
}

export default Account;
