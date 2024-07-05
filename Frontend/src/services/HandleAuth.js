import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/userSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import api from './API_Handling';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    return (data, ApiEndpoint) => {
        const notify = (message) => toast(message);
        let message = "";

        api.post(ApiEndpoint, data)
            .then((response) => {
                message = response.data.message;
                toast.success(message);
                setTimeout(() => Navigate('/'), 3000);
                dispatch(signInSuccess(response?.data?.existingUser));
            })
            .catch((e) => {
                message = e.response?.data.message;
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
                    const message = "Login Successful"
                    toast.success(message);
                    setTimeout(() => Navigate('/'), 3000);
                    dispatch(signInSuccess(googleUserData))
                })
        } catch (error) {
            console.log("Could not sign in with google", error);
        }
    }
}

export { useAuth, useGoogleAuth };