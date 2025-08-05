// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzjT9CwtDLz3puIHFL37tfrM26U7gxJnY",
  authDomain: "play-predictor-website.firebaseapp.com",
  databaseURL: "https://play-predictor-website-default-rtdb.firebaseio.com",
  projectId: "play-predictor-website",
  storageBucket: "play-predictor-website.firebasestorage.app",
  messagingSenderId: "914074778906",
  appId: "1:914074778906:web:19c3e659c24501229bc0a3",
  measurementId: "G-EKLQJCMJ2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);