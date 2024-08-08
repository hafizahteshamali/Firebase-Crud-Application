import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {getFirestore, collection, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCje-3u05CcZUOhGaZcJ4OaEAoPHhK5S90",
    authDomain: "form-authentication-3380c.firebaseapp.com",
    projectId: "form-authentication-3380c",
    storageBucket: "form-authentication-3380c.appspot.com",
    messagingSenderId: "468448811943",
    appId: "1:468448811943:web:ff2ae441aa2e312b44b482",
    measurementId: "G-GTK6STRSTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,
    sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,db,collection, addDoc, getDocs
}