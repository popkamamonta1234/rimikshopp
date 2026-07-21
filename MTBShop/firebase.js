import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";


const firebaseConfig = {

  apiKey: "AIzaSyDSiTxF6MSqv0SYXcXzFlJKUNOjP0MYRvg",

  authDomain: "mtbshop-511b8.firebaseapp.com",

  projectId: "mtbshop-511b8",

  storageBucket: "mtbshop-511b8.firebasestorage.app",

  messagingSenderId: "488809183539",

  appId: "1:488809183539:web:b7f5f671b12f1dc251a646"

};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);