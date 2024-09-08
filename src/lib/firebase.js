
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_API_KEY,
  authDomain: "reactchat-1fd01.firebaseapp.com",
  projectId: "reactchat-1fd01",
  storageBucket: "reactchat-1fd01.appspot.com",
  messagingSenderId: "866015404633",
  appId: "1:866015404633:web:e256808fe6e541bfdfc748"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage =  getStorage()