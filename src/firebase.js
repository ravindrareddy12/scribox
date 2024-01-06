// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJY_HotSL2dfLCQISgP4bnlwn6woJ_0gM",
  authDomain: "challange-e2a8d.firebaseapp.com",
  projectId: "challange-e2a8d",
  storageBucket: "challange-e2a8d.appspot.com",
  messagingSenderId: "434609328635",
  appId: "1:434609328635:web:6cf09142b6ed9538e7fb5e",
  measurementId: "G-R6W2B43LH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;