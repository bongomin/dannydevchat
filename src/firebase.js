
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
   apiKey: "AIzaSyBudLQX8F6v9YfnO0fSozRXNs9W3J2ouZs",
   authDomain: "dannydevchat-62cb3.firebaseapp.com",
   databaseURL: "https://dannydevchat-62cb3.firebaseio.com",
   projectId: "dannydevchat-62cb3",
   storageBucket: "dannydevchat-62cb3.appspot.com",
   messagingSenderId: "819214866392",
   appId: "1:819214866392:web:a156ef804a0155e85e04ad",
   measurementId: "G-6RCK5Z5P2Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;