import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

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
const colRef = collection(db, "movies");

getDocs(colRef)
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

const addForm = document.querySelector(".add");
addForm.addEventListener("submit", event => {
  event.preventDefault();
  addDoc(colRef, {
    name: addForm.name.value,
    description: addForm.description.value
  })
  .then(() => {
    addForm.reset();
  });
});

const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", event => {
  event.preventDefault();
  const documentReference = doc(db, "movies", deleteForm.id.value);
  deleteDoc(documentReference).then(() => {
    deleteForm.reset();
  });
})