import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from 'zod';

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

type FormFields = z.infer<typeof userSchema>;

const Register = () => {
    const navigator = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(userSchema) });

    const submitData = async (creds: FormFields) => {
        try{
            const res = await axios.post('/server/auth/register', creds);
            if (res.data.done){
                console.log(res.data.msg, res.data.data);
                navigator('/');
            }
            else
                setError('root', { message: 'Invalid Credentials' });
        }catch(err){
            console.log(err);
            setError('root', { message: 'Server Error' });
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 md:p-6 lg:p-8">
            <h2 className="text-2xl w-2/3 text-center leading-7 text-primary font-figtree tracking-wide font-bold md:w-1/4">Sign up to start listening</h2>

            <form className="flex flex-col gap-4 w-3/4 mx-auto text-primary my-8 md:w-1/4 lg:w-1/4" onSubmit={handleSubmit(submitData)}>
                <label className="block font-figtree text-[16px] font-extrabold" htmlFor="username">Email or username</label>
                <input {...register("email")} className="bg-background border border-solid font-figtree font-light placeholder-accent-text rounded-sm p-1 border-border" type="text" placeholder="Email or username" />

                <label className="block font-figtree text-[16px] font-extrabold" htmlFor="password">Create password</label>
                <input {...register("password")} className="bg-background border border-solid font-figtree font-light placeholder-accent-text rounded-sm p-1 border-border" type="text" placeholder="Password" />

                {errors.email && (
                    <span className="font-figtree text-red-500">{errors.email.message}</span>
                )}

                {errors.password &&(
                    <span className="font-figtree text-red-500">{errors.password.message}</span>
                )}

                {errors.root && (
                    <span className="font-figtree text-red-500">{errors.root.message}</span>
                )}

                <button disabled={isSubmitting} className="font-figtree font-extrabold bg-accent hover:bg-accent-dark p-2 my-4 rounded-2xl text-[16px] text-black" type="submit">{isSubmitting ? "Loading" : "Sign in"}</button>

                <p className="font-inria font-light mx-auto">Already have an account? <Link className="font-figtree font-semibold underline hover:text-accent" to="/"><span>Log in</span></Link></p>
            </form>
        </div>
    )
}

export default Register;
