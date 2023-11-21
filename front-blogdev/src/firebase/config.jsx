import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4oT_M8LF24QDbx-6ryEDGJ85FlgUeinU",
  authDomain: "blogdev-luizdiogo.firebaseapp.com",
  projectId: "blogdev-luizdiogo",
  storageBucket: "blogdev-luizdiogo.appspot.com",
  messagingSenderId: "494787653454",
  appId: "1:494787653454:web:0b1fabe72e40f4e81ef81f",
  measurementId: "G-G7JC8RY4H1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
