import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCt_PES8yUhtfMPMyF-ywpiXZL-3QpplJc",
  authDomain: "ccro-acc09.firebaseapp.com",
  projectId: "ccro-acc09",
  storageBucket: "ccro-acc09.appspot.com",
  messagingSenderId: "431900059555",
  appId: "1:431900059555:web:b30069514e09f1db101c16",
  measurementId: "G-TGQKE183QT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;