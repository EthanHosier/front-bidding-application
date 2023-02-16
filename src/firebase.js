
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

console.log(process.env.REACT_APP_API_KEY)

//TODO: PUT THESE IN A .env FILE
const firebaseConfig = {
    apiKey: "AIzaSyBXMAtYrsS32q337z_3oJfR6-QVAmx1vy8",
    authDomain: "choosethisimage.firebaseapp.com",
    projectId: "choosethisimage",
    storageBucket: "choosethisimage.appspot.com",
    messagingSenderId: "556732070077",
    appId: "1:556732070077:web:92c43cdbbbeb7525239fd4",
    measurementId: "G-RHMC523GRX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db }