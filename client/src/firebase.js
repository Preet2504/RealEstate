// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5b505.firebaseapp.com",
  projectId: "mern-estate-5b505",
  storageBucket: "mern-estate-5b505.appspot.com",
  messagingSenderId: "51886351826",
  appId: "1:51886351826:web:7bef48a0fe076bef8d940b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
