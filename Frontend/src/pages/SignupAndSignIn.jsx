import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../services/HandleAuth';
import '../App.css';

function SignupAndSignIn({ type }) {
    const handleAuth = useAuth();
    const schema = yup.object().shape({
        email: yup.lazy(() => {             //Lazy method conditionally check if type is sign-up and then apply validation
            if (type === 'sign-up') {
                return yup.string().email().required('Email is required');
            }
            return yup.mixed().notRequired();  //if not then it not validate the email field (assumed that  it is not present in form)
        }),
        username: yup.string().required("Username is required"),
        password: yup.string().min(8).max(20).required("Password is required"),
        // confirmPassword : yup.string().oneOf([yup.ref("password"),null]).required()
    })
    
    const Navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const ApiEndpoint = type === 'sign-up' ? '/api/auth/sign-up' : '/api/auth/sign-in';

    return (
        <div className='sigup-form mt-5'>
            <form className='flex flex-col gap-5 font-medium' onSubmit={handleSubmit((data) => {handleAuth(data , ApiEndpoint , Navigate)})}>
                {type === 'sign-up' ?
                    <Input label="Email" type='email' placeholder='Enter Email Address' {...register("email")} /> :
                    null
                }
                <Input label='Username' type='text' placeholder='Enter Username' {...register("username")} />
                <Input label='Password' type='password' placeholder='Enter Password' {...register("password")} />
                <p className='text-center text-red-400'>{errors.email?.message || errors.username?.message || errors.password?.message}</p>
                <div className='mt-2'>
                    <Button label={`${type === 'sign-up' ? 'Get Started' : 'Log in'}`} className='bg-slate-800 w-full h-[40px] text-slate-300' />
                </div>
                <div className='divider'>or</div>
                <div>
                    <Button label="Sign in With Google" className='flex justify-center items-center text-lg w-full bg-slate-100 py-2 rounded border-[2px]' logo={<FcGoogle className='me-3 text-3xl' />} />
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
                transition:Bounce />
        </div>
    )
}

export default SignupAndSignIn;
