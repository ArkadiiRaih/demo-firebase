import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIVryM3U2uIS0BWzPgerAb9paJP5FKp8M",
  authDomain: "think-piece-live-446e4.firebaseapp.com",
  databaseURL: "https://think-piece-live-446e4.firebaseio.com",
  projectId: "think-piece-live-446e4",
  storageBucket: "think-piece-live-446e4.appspot.com",
  messagingSenderId: "685101912217",
  appId: "1:685101912217:web:4b79eb5493dfcbd2dd6808"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`/users/${user.uid}`);

  // Go and fetch the document for that location
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const createdAt = new Date();
    let { displayName, email, photoURL } = user;
    photoURL =
      photoURL ||
      (await storage
        .ref()
        .child("defaults/image-placeholder-primary.svg")
        .getDownloadURL());

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        bio: "",
        followers: [],
        following: [],
        posts: [],
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }
  return getUserDocument(user.uid);
};
export const getUserDocument = uid => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export default firebase;
