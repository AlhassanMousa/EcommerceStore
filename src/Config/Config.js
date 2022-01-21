import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC4uu9-FHN5OaEP5OpwgcdJOoPR5P4su2Y",
  authDomain: "estoreok.firebaseapp.com",
  projectId: "estoreok",
  storageBucket: "estoreok.appspot.com",
  messagingSenderId: "603893311348",
  appId: "1:603893311348:web:172097e3f1a0668be9ae21",
  measurementId: "G-HCSVJS1NH4"
};


  const googleProvider = new firebase.auth.GoogleAuthProvider()
  export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
    }).catch((error) => {
      console.log(error.message)
    })
  }



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
