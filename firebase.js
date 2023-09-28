import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7WBnx9KXsHNTpRYl8p2Cgpq9jttrhB3o",
  authDomain: "amzn-auth-1e9a8.firebaseapp.com",
  projectId: "amzn-auth-1e9a8",
  storageBucket: "amzn-auth-1e9a8.appspot.com",
  messagingSenderId: "966930807600",
  appId: "1:966930807600:web:065e866a31da51cb50e6f5",
  measurementId: "G-CF4WJWX81T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
