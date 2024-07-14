import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/userSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import api from './API_Handling.js';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    return (data, ApiEndpoint) => {
        api.post(ApiEndpoint, data)
            .then((response) => {
                Navigate('/', { state: { message: response.data.message } });
                dispatch(signInSuccess(response?.data?.user));
            })
            .catch((e) => {
                setMessage(e.response?.data?.message);
                toast.error(message);
            });
    }
}

const useGoogleAuth = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    return async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const response = await signInWithPopup(auth, provider);
            const googleUserData = {
                username: response.user.displayName,
                email: response.user.email,
                photo: response.user.photoURL,
            }
            api.post('/api/auth/google', googleUserData)
                .then((response) => {
                    Navigate('/', { state: { message: "Welcome Back" } });
                    dispatch(signInSuccess(response?.data?.user))
                })
        } catch (error) {
            console.log("Could not sign in with google", error);
        }
    }
}

export { useAuth, useGoogleAuth, };