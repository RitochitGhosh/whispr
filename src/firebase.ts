import { FirebaseApp, initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBQ9-Hb_N6n6Xa3JS7rcwmJ13LF7gmAbAY",
    authDomain: "whisper-service.firebaseapp.com",
    projectId: "whisper-service",
    storageBucket: "whisper-service.firebasestorage.app",
    messagingSenderId: "203678682999",
    appId: "1:203678682999:web:de7fa889771034f3c59b72",
    databaseURL: "https://whisper-service-default-rtdb.asia-southeast1.firebasedatabase.app"
};

export const app: FirebaseApp = initializeApp(firebaseConfig);