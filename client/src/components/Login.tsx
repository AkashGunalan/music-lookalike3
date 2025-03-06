import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from 'zod'

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

type FormFields = z.infer<typeof userSchema>

const Login = () => {
    const navigator = useNavigate();

    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>({ resolver: zodResolver(userSchema) });

    const submitData = async (creds: FormFields) => {
        try{
            const res = await axios.post('/server/auth/login', creds, { withCredentials: true });
            if(res.data.done){
                console.log({ msg: 'Login Successfully..', data: res.data.msg })
                navigator('/search')
            }else 
                setError('root', { message: res.data.msg });
        }catch(err){
            console.log(err);
            setError('root', { message: 'Server Error' });
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 lg:p-6">
            <h2 className="text-3xl text-primary font-figtree leading-none tracking-wide font-bold">Log in to Sounds</h2>
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-4 w-3/4 mx-auto text-primary my-8 md:w-1/3 lg:w-1/4">

                <label className="block font-figtree text-[16px] font-extrabold" htmlFor="username">Email or username</label>
                <input {...register("email")} className="bg-background border border-solid font-figtree font-light placeholder-accent-text rounded-sm p-1 border-border" type="text" placeholder="Email or username" />

                <label className="block font-figtree text-[16px] font-extrabold" htmlFor="password">Password</label>
                <input {...register("password")} className="bg-background border border-solid font-figtree font-light placeholder-accent-text rounded-sm p-1 border-border" type="text" placeholder="Password" />


                {errors.email && (
                    <span className="font-figtree text-red-500">{errors.email.message}</span>
                )}

                {errors.password && (
                    <span className="font-figtree text-red-500">{errors.password.message}</span>
                )}

                {errors.root && (
                    <span className="font-figtree text-red-500">{errors.root.message}</span>
                )}


                <button className="font-figtree font-extrabold bg-accent hover:bg-accent-dark p-2 my-8 rounded-2xl text-[16px] text-black" type="submit">Log in</button>

                <p className="font-figtree font-light mx-auto">Don't have an account? <Link className="font-figtree font-semibold underline hover:text-accent" to='/register'><span>Sign up</span></Link></p>
            </form>
        </div>
    )
}

export default Login;
