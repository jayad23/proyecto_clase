import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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
