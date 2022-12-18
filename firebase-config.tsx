import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA21T-zey54sqnhyi1u2yjyVtkq7gjAMwo",
  authDomain: "bocchi-cd32c.firebaseapp.com",
  databaseURL:
    "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bocchi-cd32c",
  storageBucket: "bocchi-cd32c.appspot.com",
  messagingSenderId: "429017394127",
  appId: "1:429017394127:web:97bf9a991af175637340ba",
  measurementId: "G-HW15LB2E2F",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);