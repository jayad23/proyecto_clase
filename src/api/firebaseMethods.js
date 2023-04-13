import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const auth = getAuth(app);

export const onSignIn = async ({ email, password }) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const googleAuth = new GoogleAuthProvider();

export const onSingInGmail = async () => {
  try {
    return await signInWithPopup(auth, googleAuth);
  } catch (error) {
    return error;
  }
};

const db = getFirestore(app);

const usersCollection = collection(db, "users");
export const addNewUser = (title, values) => {
  setDoc(doc(usersCollection, title), values);
};

export const getUsers = async () => {
  const response = await getDocs(usersCollection);
  const results = await response.docs.map((item) => item.data());

  return results;
};

export const updateById = ({ url, id, values }) => {
  const reference = doc(db, url, id);
  updateDoc(reference, values);
};
