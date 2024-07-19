import {useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {signInSuccess} from "../Redux/userSlice.js";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/API_Handling.js';
import {app} from "../firebase.js";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {Stack} from "@mui/material";

function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const fileRef = useRef(null);

    const [profile, setProfile] = useState({
        email: currentUser.email,
        username: currentUser.username,
        avatar: currentUser.avatar,
        loginWith: currentUser.loginWith,
    });

    const [progressPerc, setProgressPerc] = useState(null);

    const [editProfile, setEditProfile] = useState(false);

    const [updateMessage, setUpdateMessage] = useState({isUpdate: false, message: '', err: false});

    const updateProfile = async () => {
        if (!Object.keys(profile).every((currVal) => (profile[currVal] === currentUser[currVal]))) {
            api.patch(`/api/user/updateProfile/${currentUser._id}`, {...profile})
                .then((response) => {
                    dispatch(signInSuccess(response.data.user));
                    setProfile({
                        email: response.data.user.email,
                        username: response.data.user.username,
                        avatar: response.data.user.avatar,
                    })
                })
                .catch(() => (setUpdateMessage({isUpdate: false, message: 'Update profile failed', err: true})))

            setUpdateMessage({isUpdate: true, message: "Profile updated successfully.", err: false});
        }
        setEditProfile(false);
    }

    const handleFileUpload = (e) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + e.target.files[0].name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressPerc(Math.round(progress));
            },
            (error) => {
                setUpdateMessage({isUpdate: false, message: error.message, err: true});
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProfile((prevProfile) => ({...prevProfile, avatar: downloadURL}));
                });
            });
    }
    // console.log(profile);
    const handleEditProfile = () => {
        setEditProfile(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setUpdateMessage({isUpdate: false, message: '', err: false});
    };

    const vertical = 'top', horizontal = 'center';

    const handleProfile = (e) => {
        setProfile((currVal) => ({...currVal, [e.target.name]: e.target.value}))
    }

    return (
        <>
            <Snackbar open={updateMessage.isUpdate || updateMessage.err} autoHideDuration={2000}
                      onClose={handleClose}
                      anchorOrigin={{vertical, horizontal}}>
                <Alert
                    onClose={handleClose}
                    severity={updateMessage.err ? "error" : "success"}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {updateMessage.message}
                </Alert>
            </Snackbar>
            <div className='h-[85vh] flex justify-center items-center'>
                <div
                    className='lg:w-[35%] w-[90%] py-1 px-6 flex flex-col items-center justify-evenly
                     h-[95%] shadow-2xl bg-slate-200'>
                    <h1 className='text-3xl font-bold text-blue-300'>Profile Page</h1>
                    <div className='overflow-hidden'>
                        <input type='file' ref={fileRef} accept='image/*' hidden disabled={!editProfile}
                               onChange={(e) => handleFileUpload(e)} name='avatar'/>
                        <img src={`${profile.avatar}`} alt='profile' className='hover:opacity-75 cursor-pointer rounded-full w-[120px]'
                             onClick={() => fileRef.current.click()}/>
                    </div>
                    {progressPerc && `File Uploading ${progressPerc}...`}
                    <div className='bg-white w-full px-3 py-2 shadow-xl'>
                        <h2 className='text-xl font-semibold mb-1'>Email</h2>
                        <input type='email' value={profile.email} name='email'
                               onChange={(e) => handleProfile(e)} disabled={!editProfile}
                               className='w-full outline-none'
                        />
                    </div>
                    <div className='w-full bg-white px-3 py-2 shadow-xl'>
                        <h2 className='text-xl font-semibold mb-1'>Username</h2>
                        <input type='text' value={profile.username} name='username'
                               onChange={(e) => handleProfile(e)} disabled={!editProfile}
                               className='w-full outline-none'
                        />
                    </div>
                    <div className='flex md:justify-between w-full md:flex-row flex-col justify-between
                     md:h-fit h-[17%]'>
                        {profile.loginWith === "realState" && <Stack direction="row" spacing={2}>
                            <Button sx={{
                                borderColor: '#57cc99',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#57cc99', color: 'white', borderColor: 'white',
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                }
                            }}
                                    onClick={editProfile ? updateProfile : handleEditProfile}
                            >
                                {editProfile ? 'Update' : 'Edit Profile'}
                            </Button>
                        </Stack>}
                        <Stack direction="row" spacing={2}>
                            <Button startIcon={<DeleteIcon/>} sx={{
                                borderColor: 'blue',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#ef233c', color: 'white', borderColor: 'white',
                                    borderStyle: 'solid',
                                    borderWidth: '1px',}
                            }}>
                                Remove Account
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
