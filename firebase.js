// const firebaseConfig = {
//   apiKey: "AIzaSyBeJPlalqlO0XNa_Ah5ermsGllZ4SxptWA",
//   authDomain: "amzn-clone-56c82.firebaseapp.com",
//   projectId: "amzn-clone-56c82",
//   storageBucket: "amzn-clone-56c82.appspot.com",
//   messagingSenderId: "804264721318",
//   appId: "1:804264721318:web:cba5564e6b05471ddb6d67",
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyxmh5yEc5CIWj4LvgBWlxog5Ba_hMxug",
  authDomain: "amzn-auth-82771.firebaseapp.com",
  projectId: "amzn-auth-82771",
  storageBucket: "amzn-auth-82771.appspot.com",
  messagingSenderId: "681202110881",
  appId: "1:681202110881:web:59abb627c40d4d6d1cfbe0",
  measurementId: "G-1LXW0Z6PNG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
