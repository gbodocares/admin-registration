const firebaseConfig = {
    apiKey: "AIzaSyAUENQYbCNyU-xCptpbB1aRMUyTw5CVtw0",
    authDomain: "gclc-f7cbb.firebaseapp.com",
    projectId: "gclc-f7cbb",
    storageBucket: "gclc-f7cbb.appspot.com",
    messagingSenderId: "273312236534",
    appId: "1:273312236534:web:d5fb06d9ef6fe324b47dd7"
};

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



//const user = firebase.auth().currentUser;