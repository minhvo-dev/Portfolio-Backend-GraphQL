const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getMyPasswordHashAsync, getMySecretStringAsync } = require("../services/firestoreServices");
const { jwtSecret } = require("../config");

/**
 * Check if the password is correct
 * @param {string} password 
 * @returns true if password is correct, false otherwise
 */
const isPasswordCorrectAsync = async (password) => {
  const passwordHash = await getMyPasswordHashAsync();
  // something wrong, return false
  if (!passwordHash) return false;
  // check the password with the password hash
  return await bcrypt.compare(password, passwordHash);
};

/**
 * Generate JWT with secret string
 * The token expires in 1 hour
 * @param {string} data
 */
const generateJWTAsync = async () => {
  const secretString = await getMySecretStringAsync();
  const tokenData = {
    secretString
  };
  const token = jwt.sign(tokenData, jwtSecret, { expiresIn: "1h" });
  return token;
};

/**
 * Generate password hash
 * @param {string} password a string contains password
 */
const generatePasswordHashAsync = async (password) => {
  const saltRounds = 3;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};

/**
 * Verify the token
 * @param {string} token a string contains json web token
 * @returns true if the token is valid, false otherwise
 */
const verifyTokenAsync = async (token) => {
  if (!token) return false;

  const decodedToken = jwt.verify(token, jwtSecret);
  const secretString = await getMySecretStringAsync();

  return decodedToken && decodedToken.secretString === secretString;
};

module.exports = {
  isPasswordCorrectAsync,
  generateJWTAsync,
  generatePasswordHashAsync,
  verifyTokenAsync
};