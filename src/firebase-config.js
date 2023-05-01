import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCK9nmFk7rKV-dViNHjw4a7gU7g5l2vg1Q",
  authDomain: "kad-mobile-apps-project.firebaseapp.com",
  databaseURL: "https://kad-mobile-apps-project-default-rtdb.firebaseio.com",
  projectId: "kad-mobile-apps-project",
  storageBucket: "kad-mobile-apps-project.appspot.com",
  messagingSenderId: "243987498790",
  appId: "1:243987498790:web:b2866330ef38e5e9fd23e7",
  measurementId: "G-36054Z989J"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;