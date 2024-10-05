// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtqNAH6c8hm4aUMbBcIYW-mu6w_fdgDxs",
  authDomain: "fitness-tracker-project-a1fbd.firebaseapp.com",
  projectId: "fitness-tracker-project-a1fbd",
  storageBucket: "fitness-tracker-project-a1fbd.appspot.com",
  messagingSenderId: "323510962573",
  appId: "1:323510962573:web:4f3121f47e2a5251f3d5c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth