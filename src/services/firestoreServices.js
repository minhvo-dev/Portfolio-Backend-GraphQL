const { getDocumentInCollectionAsync, setDataToDocumentInCollectionAsync } = require("../utils/firestore");
const { firestore } = require("../config");
const { generateRandomString } = require("../utils/helper");

/**
 * Set the new info into the database
 * @param {Object} info Info object
 * @returns true if success, false otherwise
 */
const setMyInfoAsync = async (info) => {
  try {
    await setDataToDocumentInCollectionAsync(
      firestore.collectionName,
      firestore.infoDocumentName,
      info
    );
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Retrieve my info from the database
 * @returns info object
 */
const getMyInfoAsync = async () => {
  try {
    const doc = await getDocumentInCollectionAsync(
      firestore.collectionName,
      firestore.infoDocumentName
    );
    return doc.data();
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Retrieve password hash from the database
 * @returns object contains passwordHash
 */
const getMyPasswordHashAsync = async () => {
  try {
    const doc = await getDocumentInCollectionAsync(
      firestore.collectionName,
      firestore.userDocumentName
    );
    return doc.data().passwordHash;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

const getMySecretStringAsync = async () => {
  try {
    const doc = await getDocumentInCollectionAsync(
      firestore.collectionName,
      firestore.userDocumentName
    );
    return doc.data().secretString;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Delete the existing password hash and insert the new one into the database
 * @param {string} password New password hash
 * @returns true if success, false otherwise
 */
const setMyPasswordHashAsync = async (passwordHash) => {
  try {
    const secretString = generateRandomString(15);
    await setDataToDocumentInCollectionAsync(
      firestore.collectionName,
      firestore.userDocumentName,
      { passwordHash, secretString }
    );
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  setMyInfoAsync,
  getMyInfoAsync,
  getMyPasswordHashAsync,
  setMyPasswordHashAsync,
  getMySecretStringAsync
};
