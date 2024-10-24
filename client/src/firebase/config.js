

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB4Ms2fogK83osW0qUAMiAKZPymuzx2SW4",
    authDomain: "mobimap1.firebaseapp.com",
    projectId: "mobimap1",
    storageBucket: "mobimap1.appspot.com",
    messagingSenderId: "144893066962",
    appId: "1:144893066962:web:e65a2c34c7716ae8ae770b"
};




export const app = initializeApp(firebaseConfig);
export const storage = getStorage();