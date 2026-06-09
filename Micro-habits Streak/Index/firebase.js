// firebase.js — compat version
const firebaseConfig = {
    apiKey: "AIzaSyB0x0lyVM9LH6ITLDQjKEQq2kWsSmkQQc",
    authDomain: "habitcraft-7ad09.firebaseapp.com",
    projectId: "habitcraft-7ad09",
    storageBucket: "habitcraft-7ad09.firebasestorage.app",
    messagingSenderId: "119369983069",
    appId: "1:119369983069:web:8679203d4df6cfebad99b4"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();