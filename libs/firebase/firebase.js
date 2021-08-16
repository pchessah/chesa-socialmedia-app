import Firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQ2UYeGv8K-RPpbXU-Gin78pdaksr7zhc",
    authDomain: "chesa-socialmedia.firebaseapp.com",
    projectId: "chesa-socialmedia",
    storageBucket: "chesa-socialmedia.appspot.com",
    messagingSenderId: "1043346778455",
    appId: "1:1043346778455:web:10b68fa4c7f8b3861a3612",
    measurementId: "G-LH46RMVS3L"
  };

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig)
  }


export default Firebase;