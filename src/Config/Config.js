import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";



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
