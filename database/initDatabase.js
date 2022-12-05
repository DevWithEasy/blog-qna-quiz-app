import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();