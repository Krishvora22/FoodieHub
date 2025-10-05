// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodihub-4e0db.firebaseapp.com",
  projectId: "foodihub-4e0db",
  storageBucket: "foodihub-4e0db.firebasestorage.app",
  messagingSenderId: "298029089257",
  appId: "1:298029089257:web:38dceae1576fa88ae78b78",
  measurementId: "G-V92TK6WZ8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export {auth , app};