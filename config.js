// //Database for 7th edition
// const firebaseConfig = {
//     apiKey: "AIzaSyAUENQYbCNyU-xCptpbB1aRMUyTw5CVtw0",
//     authDomain: "gclc-f7cbb.firebaseapp.com",
//     projectId: "gclc-f7cbb",
//     storageBucket: "gclc-f7cbb.appspot.com",
//     messagingSenderId: "273312236534",
//     appId: "1:273312236534:web:d5fb06d9ef6fe324b47dd7"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCzeXvcgkgLgQu1Pj2qce4wANvbe7ChWO4",
    authDomain: "gclc-eabb4.firebaseapp.com",
    databaseURL: "https://gclc-eabb4-default-rtdb.firebaseio.com",
    projectId: "gclc-eabb4",
    storageBucket: "gclc-eabb4.appspot.com",
    messagingSenderId: "588542989378",
    appId: "1:588542989378:web:ee83a42419ccaeac0249db"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBGdA9l8FCkQs2v4860DBcjpPaF-6FydqQ",
//   authDomain: "stud-4302c.firebaseapp.com",
//   databaseURL: "https://stud-4302c-default-rtdb.firebaseio.com",
//   projectId: "stud-4302c",
//   storageBucket: "stud-4302c.appspot.com",
//   messagingSenderId: "628977512024",
//   appId: "1:628977512024:web:425774b20065e0467ca42d"
// };

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



//const user = firebase.auth().currentUser;