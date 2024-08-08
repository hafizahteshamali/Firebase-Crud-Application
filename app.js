import {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup
} from "./firebase.js";

let signInBtn = document.getElementById('signIn');
let signUpBtn = document.getElementById('signUp');
let main = document.getElementById('main');

let isMove = false;
const moving = () => {
    isMove = !isMove;
    if (isMove) {
        main.classList.add('right-panel-active');
    } else {
        main.classList.remove('right-panel-active');
    }
}

signInBtn.addEventListener('click', moving);
signUpBtn.addEventListener('click', moving);





let formFields = document.querySelectorAll('#signUpForm input')
const [signName, signEmail, signPass] = formFields;
let RegBtn = document.getElementById('RegBtn');
let loader = document.getElementById('loader');


const signUp = () => {
    loader.classList.add('loader');
    event.preventDefault();
    createUserWithEmailAndPassword(auth, signEmail.value, signPass.value)
  .then((userCredential) => {
    loader.classList.remove('loader');
    Toastify({
        text: "Signup Successfully",
        duration: 3000
        }).showToast();

        signName.value = "";
        signEmail.value = "";
        signPass.value = "";
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    loader.classList.remove('loader');
    const errorCode = error.code;
    const errorMessage = error.message;
    Toastify({
        text: errorMessage,
        duration: 3000
        }).showToast();
    // ..
  });
}

RegBtn.addEventListener('click', signUp);


let loginForm = document.querySelectorAll('#loginForm input');
let loginBtn = document.getElementById('loginBtn');

const [loginEmail, loginPassword] =  loginForm;

const LoginUp = ()=>{
    loader.classList.add('loader');
    event.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    loader.classList.remove('loader');
    Toastify({
        text: "Login Successfully",
        duration: 3000
        }).showToast();
        setTimeout(()=>{
            window.location.href="./dashboard/dashboard.html";
        }, 2000);
        loginEmail.value = "";
        loginPassword.value = ""; 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    loader.classList.remove('loader');
    const errorCode = error.code;
    const errorMessage = error.message;
    Toastify({
        text: errorMessage,
        duration: 3000
        }).showToast();
  });
}

loginBtn.addEventListener('click', LoginUp);


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       window.location.href="./dashboard/dashboard.html";
//       const uid = user.uid;
//     } 
//   });



let forgotBtn = document.getElementById('forgotBtn');

const ForgotPass = ()=>{
    sendPasswordResetEmail(auth, loginEmail.value)
  .then(() => {
    Toastify({
        text: "Reset Password Check Email!",
        duration: 3000
        }).showToast();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Toastify({
        text: errorMessage,
        duration: 3000
        }).showToast();
  });
}

forgotBtn.addEventListener('click', ForgotPass);


let googleBtn = document.getElementById('googleBtn');
const provider = new GoogleAuthProvider();

const googleSinging = ()=>{
  event.preventDefault();
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
  console.log("clicked")
}

googleBtn.addEventListener('click', googleSinging)