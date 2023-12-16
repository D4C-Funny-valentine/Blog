import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBH96QmfYQvaNR-uwJjDJbQTCqOCdc2rH8",
  authDomain: "blogimagefileupload.firebaseapp.com",
  projectId: "blogimagefileupload",
  storageBucket: "blogimagefileupload.appspot.com",
  messagingSenderId: "20430141146",
  appId: "1:20430141146:web:131639b9ce6637d20257e3",
  measurementId: "G-JZ7MKRPS0C",
};
// Hey what are you looking at~!!!! I know I should put these in the .env file but  I am so boring right now so....

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
