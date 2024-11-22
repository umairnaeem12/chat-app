import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFCWnS9lHXcRR-9oMaHwQdlai9sqSqzNc",
  authDomain: "chat-app-7d014.firebaseapp.com",
  projectId: "chat-app-7d014",
  storageBucket: "chat-app-7d014.firebasestorage.app",
  messagingSenderId: "511298772873",
  appId: "1:511298772873:web:04ec2fdc1c01b26a0d0b58",
  measurementId: "G-KGMYYV41CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword };

