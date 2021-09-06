const firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");

const { firebase: firebaseConfig } = require("../config");

const app = (!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore(app);

let user = app.auth().currentUser;

const login = async () => {
  try {
    const res = await app.auth().signInWithEmailAndPassword(firebaseConfig.userEmail, firebaseConfig.userPassword);
    user = res.user;
  }
  catch (err) {
    console.log(err);
  }
};

const setDataToDocumentInCollectionAsync = async (collection, document, data) => {
  if (!user) {
    await login();
  }
  return db
    .collection(collection)
    .doc(document)
    .set(data);
};

const updateDataOfDocumentInCollectionAsync = async (collection, document, data) => {
  if (!user) {
    await login();
  }
  return db
    .collection(collection)
    .doc(document)
    .update(data);
};

const getDocumentInCollectionAsync = async (collection, document) => {
  if (!user) {
    await login();
  }
  return db
    .collection(collection)
    .doc(document)
    .get();
};

module.exports = {
  db,
  setDataToDocumentInCollectionAsync,
  updateDataOfDocumentInCollectionAsync,
  getDocumentInCollectionAsync
};