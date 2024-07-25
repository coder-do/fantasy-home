// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDziwrECcAT-bKvW0fefVD6hYOgSUF-WPQ",
  authDomain: "fantasy-home-37f3e.firebaseapp.com",
  projectId: "fantasy-home-37f3e",
  storageBucket: "fantasy-home-37f3e.appspot.com",
  messagingSenderId: "632441450004",
  appId: "1:632441450004:web:747865ad59f2c53f7ac101",
  measurementId: "G-BD9C3FXSBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;