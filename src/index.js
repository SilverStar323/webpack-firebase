import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTcpL6ee0PYNvdmoUJe4LEMgAUHTvVSvM",
  authDomain: "notnotion-f4c6d.firebaseapp.com",
  projectId: "notnotion-f4c6d",
  storageBucket: "notnotion-f4c6d.appspot.com",
  messagingSenderId: "523478366447",
  appId: "1:523478366447:web:b5ce62379f2b864174831a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, "movies");
const qRef = query(colRef, where("category", "==", "drama"), orderBy("createdAt"));

// const documentReference = doc(db, "movies", "6vDyeYJOkEq7Sn9qeC0y");
// onSnapshot(documentReference, (document) => {
//   console.log(document.data(), document.id);
// });

getDocs(qRef)
  .then(data => {
    const movies = [];
    data.docs.forEach(document => {
      movies.push({ ...document.data(), id: document.id });
    });
    console.log(movies);
  })
  .catch(error => {
    console.log(error);
  });

// onSnapshot(colRef, (data) => {
//   const movies = [];
//   data.docs.forEach(document => {
//     movies.push({...document.data(), id: document.id});
//   });
//   console.log(movies);
// });

const addForm = document.querySelector(".add");
addForm.addEventListener("submit", event => {
  event.preventDefault();
  addDoc(colRef, {
    name: addForm.name.value,
    category: addForm.category.value,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      addForm.reset();
    });
});

const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", event => {
  event.preventDefault();
  const documentReference = doc(db, "movies", deleteForm.id.value);
  deleteDoc(documentReference)
    .then(() => {
      deleteForm.reset();
    });
});

const updatedForm = document.querySelector(".update");
updatedForm.addEventListener("submit", event => {
  event.preventDefault();

  const documentReference = doc(db, "movies", updatedForm.id.value);
  updateDoc(documentReference, {
    name: updatedForm.name.value,
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      updatedForm.reset();
    });
});