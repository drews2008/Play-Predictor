// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
