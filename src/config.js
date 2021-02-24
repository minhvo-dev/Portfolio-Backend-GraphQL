require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  infoCollName: process.env.INFO_COLLECTION_NAME,
  userCollName: process.env.USER_COLLECTION_NAME,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV
};