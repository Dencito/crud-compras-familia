// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC1QBZjDiTyHMBwIHh9KL3wuf8fee9Apig",
  authDomain: "crud-papu.firebaseapp.com",
  projectId: "crud-papu",
  storageBucket: "crud-papu.appspot.com",
  messagingSenderId: "632966235099",
  appId: "1:632966235099:web:ac14e2b9fec955ecc05dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);