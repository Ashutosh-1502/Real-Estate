import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/API_Handling';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function SignForm() {
    const schema = yup.object().shape({
        email: yup.string().email().required("Email is Required"),
        username: yup.string().required("Username is required"),
        password: yup.string().min(8).max(20).required("Password is required"),
        // confirmPassword : yup.string().oneOf([yup.ref("password"),null]).required()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();
    const notify = (message) => toast(message);
    let message = "";

    const signup = (data) => {
        setIsLoading(true);
        api.post('/api/auth/sign-up', data)
            .then((response) => {
                message = "Login successfull";
                toast.success(message);
                setTimeout(() => Navigate('/'), 3000);
            })
            .catch((e) => {
                setIsLoading(false);
                message = "Username Must be unique";
                toast.error(message);
                setIsLoading(false);
            });
    }

    return (
        <div className='sigup-form mt-5'>
            <form className='flex flex-col gap-5 font-medium' onSubmit={handleSubmit(signup)}>
                <Input label="Email" type='email' placeholder='Enter Email Address' {...register("email")} />
                <Input label='Username' type='text' placeholder='Enter Username' {...register("username")} />
                <Input label='Password' type='password' placeholder='Enter Password' {...register("password")} />
                <p className='text-center text-red-400'>{errors.email?.message || errors.username?.message || errors.password?.message}</p>
                <div className='mt-2'>
                    <Button label="Get Started" className='bg-slate-800 w-full h-[40px] text-slate-300' />
                </div>
                <div className='divider'>or</div>
                <div>
                    <Button label="Sign in With Google" className='flex justify-center items-center text-lg w-full bg-slate-100 py-2 rounded border-[2px]' logo={<FcGoogle className='me-3 text-3xl' />} isLoading={isLoading} />
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce/>
        </div>
    )
}

export default SignForm
