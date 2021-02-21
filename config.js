import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBFppK_KeFMQ8kRsdTFanGMpDUAcpFm4JM",
    authDomain: "attendance-959a4.firebaseapp.com",
    databaseURL: "https://attendance-959a4-default-rtdb.firebaseio.com",
    projectId: "attendance-959a4",
    storageBucket: "attendance-959a4.appspot.com",
    messagingSenderId: "663301231803",
    appId: "1:663301231803:web:ad7a6eedf4d39676e4059e"
  };

let app = firebase.initializeApp(firebaseConfig);

export default app.database();