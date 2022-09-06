// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBvwBi8JlkNn5l91oRjTe8q8xevcTQoN0",
  authDomain: "singlesignon-auth.firebaseapp.com",
  projectId: "singlesignon-auth",
  storageBucket: "singlesignon-auth.appspot.com",
  messagingSenderId: "359044473943",
  appId: "1:359044473943:web:8b48312341e7fcf7c12f12",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const storage = getStorage(initializeApp(firebaseConfig));
