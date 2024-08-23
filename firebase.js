// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getFirebase } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq4Zm3Prb0UEumHKDoT5ArpzJzoH-roFs",
  authDomain: "flashcardsaas-14e07.firebaseapp.com",
  projectId: "flashcardsaas-14e07",
  storageBucket: "flashcardsaas-14e07.appspot.com",
  messagingSenderId: "345719714743",
  appId: "1:345719714743:web:fb72e14fcaf46f37292e32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }