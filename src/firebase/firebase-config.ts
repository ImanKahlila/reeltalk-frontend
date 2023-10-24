// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCheP7mtuwc2iUR_Zs8FehRo5GC3iixhRc',
    authDomain: 'reeltalk-app.firebaseapp.com',
    databaseURL: 'https://reeltalk-app-default-rtdb.firebaseio.com',
    projectId: 'reeltalk-app',
    storageBucket: 'reeltalk-app.appspot.com',
    messagingSenderId: '259349555151',
    appId: '1:259349555151:web:12f2ca90dfa29725d394ba',
    measurementId: 'G-MP7M934DEE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
