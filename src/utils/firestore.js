const firebase = require("firebase");
require("firebase/firestore");

const { firebase: firebaseConfig } = require("../config");

const app = (!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore(app);

const setDataToDocumentInCollectionAsync = (collection, document, data) =>
  db
    .collection(collection)
    .doc(document)
    .set(data);

const updateDataOfDocumentInCollectionAsync = (collection, document, data) =>
  db
    .collection(collection)
    .doc(document)
    .update(data);

const getDocumentInCollectionAsync = (collection, document) =>
  db
    .collection(collection)
    .doc(document)
    .get();

module.exports = {
  db,
  setDataToDocumentInCollectionAsync,
  updateDataOfDocumentInCollectionAsync,
  getDocumentInCollectionAsync
};