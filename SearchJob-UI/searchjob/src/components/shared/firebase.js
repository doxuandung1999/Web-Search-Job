import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBvBrlouecdoQbRuEVStac_fpVL9_u5498",
    authDomain: "searchjob-50781.firebaseapp.com",
    projectId: "searchjob-50781",
    storageBucket: "searchjob-50781.appspot.com",
    messagingSenderId: "485386408023",
    appId: "1:485386408023:web:cc0f0ae10666f05b7e1312",
    measurementId: "G-SZRY0S1V8B"
};

const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export { fb, db }