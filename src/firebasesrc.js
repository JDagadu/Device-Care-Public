import {initializeApp} from 'firebase/app'
import { getFunctions } from 'firebase/functions';

import { getAuth, signInWithEmailAndPassword,onAuthStateChanged, getRedirectResult, signOut} from "firebase/auth";

// import { getAuth,  } from 'firebase/auth';
import {getFirestore,doc,getDoc,onSnapshot} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDT9dKiRLqlT-fwGtOFCxRrNBPO8nVRNl8",
    authDomain: "devicecare-652a9.firebaseapp.com",
    projectId: "devicecare-652a9",
    storageBucket: "devicecare-652a9.appspot.com",
    messagingSenderId: "361090888936",
    appId: "1:361090888936:web:74010c5d749208c544c55d",
    measurementId: "G-FFLRH8N19V"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const functions = getFunctions(app);
  const db = getFirestore(app);
  const auth = getAuth();

function signIn(email,password){
       

return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log('signed in')
    const user = userCredential.user;
    console.log(user.uid);


    return user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode,errorMessage)
    return errorMessage+' '+errorCode
  });


  

}

async function signOutUser(){
  return await signOut(auth);
}

export {signIn,getDoc,getFirestore,doc,onSnapshot,signOutUser,functions,db}

