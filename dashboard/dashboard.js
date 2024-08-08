import {
    auth,
    signOut,
    onAuthStateChanged,
    db,
    collection,
    addDoc,
    getDocs
} from "../firebase.js";


let logoutBtn = document.getElementById('logoutBtn');
const Logout = () => {
    signOut(auth).then(() => {
        Toastify({
            text: "Logout Successfully",
            duration: 3000
        }).showToast();
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    }).catch((error) => {
        Toastify({
            text: error,
            duration: 3000
        }).showToast();
    });
}

logoutBtn.addEventListener('click', Logout);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../index.html";
        const uid = user.uid;
    }
});


let username = document.getElementById('username');
let assigLink = document.getElementById('assig-link');
let addBtn = document.getElementById('addBtn');
let loader = document.getElementById('loader');
let table = document.getElementById('myTable');
let tbody = table.querySelector('tbody');
let rows = tbody.getElementsByTagName('tr');
let myIntro = document.getElementById('myIntro');

const addAssignment = async () => {
    event.preventDefault();
    if (username.value.trim() !== "" && assigLink.value.trim() !== "") {
        loader.classList.add('loader');
        try {
            const docRef = await addDoc(collection(db, "UserAssignments"), {
                username: username.value,
                assigLink: assigLink.value
            });
            console.log("Document written with ID: ", docRef.id);

            getData();

            username.value = "";
            assigLink.value = "";

        } catch (e) {
            loader.classList.remove('loader');
            console.error("Error adding document: ", e);
        } finally {
            loader.classList.remove('loader');
        }
    } else {
        loader.classList.remove('loader');
        Toastify({
            text: "Please fill all inputs",
            duration: 3000
        }).showToast();
    }
}

addBtn.addEventListener('click', addAssignment);


const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "UserAssignments"));
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const {
            username,
            assigLink
        } = doc.data();

        if (rows.length > 0) {
            myIntro.style.display="none";
            table.style.display = "block";
            table.innerHTML += `
    <tr>
    <td>${username}</td>
    <td><a href="${assigLink}">${assigLink}</a></td>
    <td><button>Update</button><button>Delete</button></td>
    
    </tr>
    `
        } else {
            table.style.display = "none";
            myIntro.style.display="block";
        }
    });
}

getData();