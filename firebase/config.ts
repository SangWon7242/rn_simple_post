// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "simplepostapp2.firebaseapp.com",
  projectId: "simplepostapp2",
  storageBucket: "simplepostapp2.firebasestorage.app",
  messagingSenderId: "437637265456",
  appId: "1:437637265456:web:d3b8388d7f57141dd015f5",
  measurementId: "G-FGRQ8KLNFE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// FirestoreDB에 접근
export const db = getFirestore(app);
