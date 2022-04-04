import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc,
         where, getDocs, query,
         onSnapshot, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpQjpvHyQe81RKJMdPkdJoIo5707g1ytA",
    authDomain: "uber-clone-3e62f.firebaseapp.com",
    projectId: "uber-clone-3e62f",
    storageBucket: "uber-clone-3e62f.appspot.com",
    messagingSenderId: "137530507543",
    appId: "1:137530507543:web:661cfb5b802e26baf47752",
    measurementId: "G-32YHZTBWJ6"
  };

  
  initializeApp( firebaseConfig );
  const auth = getAuth();
  const db = getFirestore();
  const provider = new GoogleAuthProvider();
  
  export {auth, provider, signInWithPopup, onAuthStateChanged, 
    signOut, collection, getDocs,getDoc, query, where, onSnapshot, doc }
    
  export default db;