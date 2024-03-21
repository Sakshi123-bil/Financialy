// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore , doc , setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkYPsszI7ZiXnzjb4QQQ6me7Eb7ZUw7n0",
  authDomain: "financelyapp-4c887.firebaseapp.com",
  projectId: "financelyapp-4c887",
  storageBucket: "financelyapp-4c887.appspot.com",
  messagingSenderId: "873395304724",
  appId: "1:873395304724:web:84c5ac5a16aef65ed0ea01",
  measurementId: "G-GY3JLQCV41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db , auth , provider , doc ,setDoc}; // what is doc and setdoc here  ?