/**
 * Get a random string with a specific size
 * @param {int} length the size of the string
 * @returns a random string
 */
const generateRandomString = (length) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (new Array(length))
    .fill("")
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};

module.exports = {
  generateRandomString,
};