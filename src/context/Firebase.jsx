// import React, {createContext,useContext} from "react";
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";



// const FirebaseContext=createContext(null);

// //---------

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAAS1hm0OMfHex3DysEOMH-5sO0kxKhv5I",
// //   authDomain: "tracker-19b2c.firebaseapp.com",
// //   projectId: "tracker-19b2c",
// //   storageBucket: "tracker-19b2c.appspot.com",
// //   messagingSenderId: "85091242934",
// //   appId: "1:85091242934:web:6d47df218a948940a6e717",
// //   measurementId: "G-SRC7RYFXXR",
// //   databaseURL: "https://console.firebase.google.com/u/0/project/tracker-19b2c/database/tracker-19b2c-default-rtdb/data/~2F",
// // };

// const firebaseConfig = {
//     apiKey: "AIzaSyAAS1hm0OMfHex3DysEOMH-5sO0kxKhv5I",
//     authDomain: "tracker-19b2c.firebaseapp.com",
//     projectId: "tracker-19b2c",
//     storageBucket: "tracker-19b2c.appspot.com",
//     messagingSenderId: "85091242934",
//     appId: "1:85091242934:web:6d47df218a948940a6e717",
//     measurementId: "G-SRC7RYFXXR",
//     databaseURL: "https://tracker-19b2c-default-rtdb.firebaseio.com",
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// //-----
  
// export const useFirebase=()=>useContext(FirebaseContext);

// // Custom Hook to use Firebase Context
// // export const useFirebase = () => {
// //     return useContext(FirebaseContext); // Correct: useContext is inside a custom hook
// //   };

// export const FirebaseProvider=(props)=>{
//     return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>
// };

// export { app };

import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; // Import database services

// Create Firebase Context
const FirebaseContext = createContext(null);

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCkUVS5zIbWeBbqDWZ5fFjK_ZD6cn1nBnU",
//   authDomain: "todo-list-7a877.firebaseapp.com",
//   projectId: "todo-list-7a877",
//   storageBucket: "todo-list-7a877.appspot.com",
//   messagingSenderId: "48820528985",
//   appId: "1:48820528985:web:bfcb579018ffb0dde88e48",
//   databaseURL: "https://todo-list-7a877-default-rtdb.firebaseio.com/",
// };

const firebaseConfig = {
    apiKey: "AIzaSyDqKYqB7ezRP6Cp2SqktQSTh93TOFxd0xc",
    authDomain: "todo-f9952.firebaseapp.com",
    projectId: "todo-f9952",
    storageBucket: "todo-f9952.appspot.com",
    messagingSenderId: "170666138915",
    appId: "1:170666138915:web:c6f3e3740ea08ea713c096",
    databaseURL: "https://todo-f9952-default-rtdb.firebaseio.com/",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Firebase Database

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};
export { app, db };