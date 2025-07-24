import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // your config here
};

export const app = initializeApp(firebaseConfig);  // <-- export here
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
