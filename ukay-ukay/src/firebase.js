import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7DwxhLNiswQkU-s4RDviFdTfGbfzZjtg",
  authDomain: "ukay-58a99.firebaseapp.com",
  databaseURL: "https://ukay-58a99.firebaseio.com",
  projectId: "ukay-58a99",
  storageBucket: "ukay-58a99.appspot.com",
  messagingSenderId: "925130367343",
  appId: "1:925130367343:web:91b344f2b3c51bf925489a",
  measurementId: "G-94B7TWWQLS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialize firebase db
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions()


export { db, auth,storage,functions};
