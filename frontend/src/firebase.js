import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB97AB-ymxnrabvYT3U9repyKrWIk3tvLk",
  authDomain: "ecommerce-b8b04.firebaseapp.com",
  projectId: "ecommerce-b8b04",
  storageBucket: "ecommerce-b8b04.firebasestorage.app",
  messagingSenderId: "700439214754",
  appId: "1:700439214754:web:8649fe43f03e589bbb35fb",
  measurementId: "G-8PTF7HPEME"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
