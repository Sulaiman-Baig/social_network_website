import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTHdqGBU-D75TCkSJpICYSlqUy6vwgMRk",  
    authDomain: "social-network-for-react-app.firebaseapp.com",  
    projectId: "social-network-for-react-app",  
    storageBucket: "social-network-for-react-app.appspot.com",  
    messagingSenderId: "906837954167",  
    appId: "1:906837954167:web:3ad0ad90bb8cfd25b38072"
  
  };
  

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export { app, fireDB }