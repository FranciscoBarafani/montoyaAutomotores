//Firebase Import
import firebase from "firebase/app";
//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBaWsfkB3B3oPin4rS2x2QpQLv5JG6_360",
  authDomain: "montoyaautomotores-c0649.firebaseapp.com",
  databaseURL: "https://montoyaautomotores-c0649.firebaseio.com",
  projectId: "montoyaautomotores-c0649",
  storageBucket: "montoyaautomotores-c0649.appspot.com",
  messagingSenderId: "807686735529",
  appId: "1:807686735529:web:347d4048c12e347780cbb8",
  measurementId: "G-BB2ELH5NY2",
};
//Firebase Initialize
export default firebase.initializeApp(firebaseConfig);
