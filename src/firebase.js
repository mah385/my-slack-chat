import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnGoGWHw4g5t0Ebufuh2fTFCAXhfA8MsY",
  authDomain: "my-react-slack-chat.firebaseapp.com",
  databaseURL: "https://my-react-slack-chat.firebaseio.com",
  projectId: "my-react-slack-chat",
  storageBucket: "my-react-slack-chat.appspot.com",
  messagingSenderId: "97794781300",
  appId: "1:97794781300:web:a0a1bf138b0bacefcf6121",
  measurementId: "G-QX42J8DNM6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;

/*service firebase.storage {
  match /b/{bucket}/o {
  match /{allPaths=**} {
    allow read, write: if request.auth != null;
  }
}
}*/
