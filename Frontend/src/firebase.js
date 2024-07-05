// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-58708.firebaseapp.com",
  projectId: "mern-estate-58708",
  storageBucket: "mern-estate-58708.appspot.com",
  messagingSenderId: "578229918083",
  appId: "1:578229918083:web:06d298fe188bb319353eb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);