import { useDispatch } from 'react-redux';
import { signInSuccess, setIsLoading } from '../Redux/userSlice.js';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import api from './API_Handling.js';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    return (data, ApiEndpoint) => {
        dispatch(setIsLoading(true));
        api.post(ApiEndpoint, data)
            .then((response) => {
                dispatch(setIsLoading(false));
                dispatch(signInSuccess(response?.data?.user));
                Navigate('/', { state: { message: response.data.message } });
            })
            .catch((e) => {
                console.log(e);
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
            dispatch(setIsLoading(true));
            api.post('/api/auth/google', googleUserData)
                .then((response) => {
                    Navigate('/', { state: { message: "Welcome Back" } });
                    dispatch(setIsLoading(false));
                    dispatch(signInSuccess(response?.data?.user))
                })
        } catch (error) {
            console.log("Could not sign in with google", error);
        }
    }
}

export { useAuth, useGoogleAuth, };