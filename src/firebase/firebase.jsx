// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// api-1
// const firebaseConfig = {
//   apiKey: "AIzaSyBzHt9QiqYBaYjLgOlwV_OwOFxTVUTTOuA",
//   authDomain: "library-management-syste-cc17a.firebaseapp.com",
//   projectId: "library-management-syste-cc17a",
//   storageBucket: "library-management-syste-cc17a.appspot.com",
//   messagingSenderId: "243993819626",
//   appId: "1:243993819626:web:e71cff4dc1d071a4f71a93"
// };

// api-2
// const firebaseConfig = {
//   apiKey: "AIzaSyDmUvzuiYh5TINtw61JQaN1p_JQ7OWuTfI",
//   authDomain: "library-2-9a5f5.firebaseapp.com",
//   projectId: "library-2-9a5f5",
//   storageBucket: "library-2-9a5f5.appspot.com",
//   messagingSenderId: "179284351770",
//   appId: "1:179284351770:web:cca87c0ebcdcb47c862aa3"
// };

// api-3
const firebaseConfig = {
  apiKey: "AIzaSyCi2rtkp5g_sQF1uwxIodGAfx03NxhHAHY",
  authDomain: "library-3-9a340.firebaseapp.com",
  projectId: "library-3-9a340",
  storageBucket: "library-3-9a340.appspot.com",
  messagingSenderId: "458775487083",
  appId: "1:458775487083:web:c09b993fa50b58cb57872e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app)
