// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Replace this configuration with your Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyDhN_CWgyswBb_D2aPnpcn8JeK_0d2twXc",
  authDomain: "whatsapp-clone-xjones.firebaseapp.com",
  projectId: "whatsapp-clone-xjones",
  storageBucket: "whatsapp-clone-xjones.appspot.com",
  messagingSenderId: "568476853400",
  appId: "1:568476853400:web:4cacf36e2209ad0da11ced",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };