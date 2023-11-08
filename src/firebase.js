// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCOPZl2S5tWVUyzn7yhpXygefhx2pN7NjU",

  authDomain: "trashcan-2-3059e.firebaseapp.com",

  projectId: "trashcan-2-3059e",

  storageBucket: "trashcan-2-3059e.appspot.com",

  messagingSenderId: "868926508022",

  appId: "1:868926508022:web:3026658f25f1015d1ad5d7",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
