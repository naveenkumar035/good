// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOsqxQXCUmuRCR_HLUC91yIBgsOrIgRP0",
    authDomain: "huco-9f896.firebaseapp.com",
    databaseURL: "https://huco-9f896-default-rtdb.firebaseio.com",
    projectId: "huco-9f896",
    storageBucket: "huco-9f896.appspot.com",
    messagingSenderId: "692689852368",
    appId: "1:692689852368:web:06562137751fe56d8d4bd5",
    measurementId: "G-HRPMY2CPJS"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage();


export {db, storage};
export default app;