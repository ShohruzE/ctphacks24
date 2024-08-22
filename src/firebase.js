// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV3Jz2dSqwwBrI3sRW1jaRa3sQhv5u9_g",
  authDomain: "club-finder-90824.firebaseapp.com",
  projectId: "club-finder-90824",
  storageBucket: "club-finder-90824.appspot.com",
  messagingSenderId: "678707585892",
  appId: "1:678707585892:web:9d8b4063a59542d7469071",
  measurementId: "G-5CF234TYYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };