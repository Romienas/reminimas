import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API,
    authDomain: "reminimas-470d5.firebaseapp.com",
    databaseURL: "https://reminimas-470d5.firebaseio.com",
    projectId: "reminimas-470d5",
    storageBucket: "reminimas-470d5.appspot.com",
    messagingSenderId: "656575311576",
    appId: "1:656575311576:web:f3f9faf8d8e7215fa731ad",
    measurementId: "G-NC6J8X9TY5"
  };
  
firebase.initializeApp(firebaseConfig);