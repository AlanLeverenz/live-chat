import firebase from 'firebase/app'
import 'firebase/firestore/'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAfqbiHJKcMEd9ryWNmJizm3I_tLObs_iM",
    authDomain: "vue-firebase-sites-bf315.firebaseapp.com",
    projectId: "vue-firebase-sites-bf315",
    storageBucket: "vue-firebase-sites-bf315.appspot.com",
    messagingSenderId: "248777487074",
    appId: "1:248777487074:web:396ca930aa6278c6fb24bb"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp, projectAuth }
