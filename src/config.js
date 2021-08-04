require("dotenv").config();

module.exports = {
  firebase: {
    apiKey: process.env.FIRESTORE_APIKEY,
    authDomain: process.env.FIRESTORE_AUTHDOMAIN,
    projectId: process.env.FIRESTORE_PROJECT_ID,
  },
  firestore: {
    collectionName: process.env.FIRESTORE_COLLECTION_NAME,
    infoDocumentName: process.env.FIRESTORE_INFO_DOCUMENT_NAME,
    userDocumentName: process.env.FIRESTORE_USER_DOCUMENT_NAME
  },
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV
};