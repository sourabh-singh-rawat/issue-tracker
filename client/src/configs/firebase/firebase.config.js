import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm_H6GkkUh5DuXCwyMHmZLrIeLWn3iaE0",
  authDomain: "issue-tracker-66803.firebaseapp.com",
  projectId: "issue-tracker-66803",
  storageBucket: "issue-tracker-66803.appspot.com",
  messagingSenderId: "579560355104",
  appId: "1:579560355104:web:f5e6fdb13570f3dfffd345",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
