// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "health-prediction-47338.firebaseapp.com",
  projectId: "health-prediction-47338",
  storageBucket: "health-prediction-47338.firebasestorage.app",
  messagingSenderId: "306132901070",
  appId: "1:306132901070:web:c744c7242be97a122a849f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

const provider=new GoogleAuthProvider()


export {auth,provider}