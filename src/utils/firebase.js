// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2YUqLas_l454WwNlfx684QTPo5sM19BU",
  authDomain: "generador-plantillas.firebaseapp.com",
  projectId: "generador-plantillas",
  storageBucket: "generador-plantillas.firebasestorage.app",
  messagingSenderId: "627572871521",
  appId: "1:627572871521:web:1aa6a1b4c8710a87cd7520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);