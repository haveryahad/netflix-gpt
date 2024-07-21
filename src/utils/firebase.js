// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrYPpF9ltc-xEBFtO0NjTkmw6q4u6-vGY",
  authDomain: "netflixgpt-105d9.firebaseapp.com",
  projectId: "netflixgpt-105d9",
  storageBucket: "netflixgpt-105d9.appspot.com",
  messagingSenderId: "672109694478",
  appId: "1:672109694478:web:92885c6b57457f9c8bf65f",
  measurementId: "G-EZ6DWDLFF7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
