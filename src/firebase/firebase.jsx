// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzHt9QiqYBaYjLgOlwV_OwOFxTVUTTOuA",
  authDomain: "library-management-syste-cc17a.firebaseapp.com",
  projectId: "library-management-syste-cc17a",
  storageBucket: "library-management-syste-cc17a.appspot.com",
  messagingSenderId: "243993819626",
  appId: "1:243993819626:web:e71cff4dc1d071a4f71a93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app)
