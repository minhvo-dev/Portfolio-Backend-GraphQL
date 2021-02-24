const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getMyPasswordHash } = require("../services/dbServices");
const { jwtSecret } = require("../config");

/**
 * Get the id of the user in the database based on the password
 * @param {string} password Password to check
 * @returns null if the password is incorrect
 * @returns id of the user if the password is correct
 */
const getIDFromPassword = async (password) => {
  const result = await getMyPasswordHash();

  // no user means no login information to compare
  if (result === null) return null;

  // check the password with the password hash
  const isPasswordCorrect = await bcrypt.compare(password, result.passwordHash);
  if (isPasswordCorrect === false) return null;
  return result._id.toString();
};

/**
 * Generate JWT based on user id
 * The token expires in 1 hour
 * @param {string} id User id
 */
const generateJWT = (id) => {
  const tokenData = {
    id
  };
  const token = jwt.sign(tokenData, jwtSecret, { expiresIn: "1h" });
  return token;
};

/**
 * Generate password hash
 * @param {string} password a string contains password
 */
const generatePasswordHash = async (password) => {
  const saltRounds = 3;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};

/**
 * Verify the token
 * @param {string} token a string contains json web token
 * @returns true if the token is valid, false otherwise
 */
const verifyToken = async (token) => {
  if (!token) return false;

  const decodedToken = jwt.verify(token, jwtSecret);
  if (!decodedToken.id) {
    return false;
  }

  const result = await getMyPasswordHash();

  if (decodedToken.id !== result._id.toString()) {
    return false;
  }
  return true;
};

module.exports = {
  getIDFromPassword,
  generateJWT,
  generatePasswordHash,
  verifyToken
};