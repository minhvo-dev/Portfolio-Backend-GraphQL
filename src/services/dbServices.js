const { MongoClient } = require("mongodb");

const config = require("../config");

/**
 * Get the mongodb client from the Db Url
 */
const getMongoClient = () => {
  return MongoClient.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

/**
 * Delete existing info and insert the new info into the database
 * @param {Object} info Info object
 * @returns true if success, false otherwise
 */
const setMyInfo = async (info) => {
  let client = null;
  try {
    client = await getMongoClient();
    const db = client.db(config.dbName);
    await db.collection(config.infoCollName).deleteMany({});
    const result = await db.collection(config.infoCollName).insertOne(info);
    return result.insertedCount === 1;
  }
  catch (error) {
    console.log(error);
  }
  finally {
    if (client) {
      client.close();
    }
  }
};

/**
 * Retrieve my info from the database
 * @returns info object
 */
const getMyInfo = async () => {
  let client = null;
  try {
    client = await getMongoClient();
    const db = client.db(config.dbName);
    const result = await db.collection(config.infoCollName).findOne();
    return result;
  }
  catch (error) {
    console.log(error);
  }
  finally {
    if (client) {
      client.close();
    }
  }
};

/**
 * Retrieve password hash from the database
 * @returns object contains passwordHash
 */
const getMyPasswordHash = async () => {
  let client = null;
  try {
    client = await getMongoClient();
    const db = client.db(config.dbName);
    const result = await db.collection(config.userCollName).findOne();
    return result;
  }
  catch (error) {
    console.log(error);
  }
  finally {
    if (client) {
      client.close();
    }
  }
};

/**
 * Delete the existing password hash and insert the new one into the database
 * @param {string} password New password hash
 * @returns true if success, false otherwise
 */
const setMyPassword = async (passwordHash) => {
  let client = null;
  try {
    client = await getMongoClient();
    const db = client.db(config.dbName);
    await db.collection(config.userCollName).deleteMany({});
    const result = await db.collection(config.userCollName).insertOne({ passwordHash });
    return result.insertedCount === 1;
  }
  catch (error) {
    console.log(error);
  }
  finally {
    if (client) {
      client.close();
    }
  }
};

module.exports = {
  setMyInfo,
  getMyInfo,
  getMyPasswordHash,
  setMyPassword
};
