import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBoVIBAdtKbCCiMHPrhSOpNMzM-kuPM_RM",
    authDomain: "bartersystem-38d25.firebaseapp.com",
    projectId: "bartersystem-38d25",
    storageBucket: "bartersystem-38d25.appspot.com",
    messagingSenderId: "101346888814",
    appId: "1:101346888814:web:16a2b4cfabedb0c426aa7f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();