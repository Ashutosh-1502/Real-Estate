import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/userSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import api from './API_Handling';

const useAuth = () => {
    const dispatch = useDispatch();
    return (data, ApiEndpoint, Navigate) => {
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


// const signup = (data) => {
//     api.post('/api/auth/sign-up', data)
//         .then((response) => {
//             message = response.data.message;
//             toast.success(message);
//             setTimeout(() => Navigate('/'), 3000);
//         })
//         .catch((e) => {
//             message = e.response?.data.message;
//             toast.error(message);
//             setIsLoading(false);
//         });
// }
// const signIn = (data) => {
//     console.log(data);
// }


export default useAuth;