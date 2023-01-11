// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCubHck_gPDPKgS3xEvuYWNY_8tAbuF1lI",
  authDomain: "gastosdelmes-f9354.firebaseapp.com",
  projectId: "gastosdelmes-f9354",
  storageBucket: "gastosdelmes-f9354.appspot.com",
  messagingSenderId: "375306895701",
  appId: "1:375306895701:web:858c3c6652153d8f3a2fdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);