import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_ruPwxe4cO9qsOsg8v3-Ja9Ivbz00uOM",
  authDomain: "login-526ff.firebaseapp.com",
  projectId: "login-526ff",
  storageBucket: "login-526ff.firebasestorage.app",
  messagingSenderId: "124647853141",
  appId: "1:124647853141:web:f21605371b0adaad6fd8dc",
  measurementId: "G-VWHQP56D2W",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

//
