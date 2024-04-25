import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDjXuDzY0f8sBIycbzntXX7zcEJSIxo8X0",
  authDomain: "crud-operations-firebase-262f3.firebaseapp.com",
  projectId: "crud-operations-firebase-262f3",
  storageBucket: "crud-operations-firebase-262f3.appspot.com",
  messagingSenderId: "977240735257",
  appId: "1:977240735257:web:b0eb64a30802fb437a3488"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);