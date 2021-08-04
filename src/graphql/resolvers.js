const dbServices = require("../services/firestoreServices");
const login = require("../utils/loginUtils");
const { nodeEnv } = require("../config");

const resolvers = {
  /**
   * Retrieve my info from the database
   */
  getMyInfo: async () => await dbServices.getMyInfoAsync(),
  /**
   * Replace info object in the database by new one
   * @param {Object} info Info object
   * @returns true if success, false otherwise
   */
  setMyInfo: async (info, req) => {
    const isValidToken = await login.verifyTokenAsync(req.token);
    if (!isValidToken) {
      throw new Error("Unauthorized access 😐");
    }
    return await dbServices.setMyInfoAsync(info);
  },
  /**
   * Set my availability
   * @param {{boolean}} {available} availability
   * @returns true if success, false otherwise
   */
  setMyAvailability: async ({ available }, req) => {
    const isValidToken = await login.verifyTokenAsync(req.token);
    if (!isValidToken) {
      throw new Error("Unauthorized access 😐");
    }
    const info = await dbServices.getMyInfoAsync();
    const newInfo = {
      ...info,
      availability: available
    };
    const result = await dbServices.setMyInfoAsync(newInfo);
    return result;
  },
  /**
   * Add a set of new skills into the current skills in the database
   * @param {{Array<String>}} {skills} skills
   * @returns Updated skills in the database
   */
  addSkills: async ({ skills }, req) => {
    const isValidToken = await login.verifyTokenAsync(req.token);
    if (!isValidToken) {
      throw new Error("Unauthorized access 😐");
    }
    const info = await dbServices.getMyInfoAsync();
    const combined = [...info.skills, ...skills];
    const newSkills = [...new Set(combined)];
    const newInfo = {
      ...info,
      skills: newSkills
    };
    const result = await dbServices.setMyInfoAsync(newInfo);
    return result ? newSkills : info.skills;
  },
  /**
   * Remove a set of skills from the current skills in the database
   * @param {{Array<String?}} {skills} skills
   * @returns Updated skills in the database
   */
  removeSkills: async ({ skills }, req) => {
    const isValidToken = await login.verifyTokenAsync(req.token);
    if (!isValidToken) {
      throw new Error("Unauthorized access 😐");
    }
    const info = await dbServices.getMyInfoAsync();
    const newSkills = info.skills.filter(skill => skills.includes(skill) === false);
    const newInfo = {
      ...info,
      skills: newSkills
    };
    const result = await dbServices.setMyInfoAsync(newInfo);
    return result ? newSkills : info.skills;
  },
  /**
   * Login into the system
   * @param {{string}} password a string contains password 
   * @returns json web token contains the login information
   */
  login: async ({ password }) => {
    const valid = await login.isPasswordCorrectAsync(password);
    if (!valid) {
      throw new Error("Wrong credential 🤨");
    }

    const token = await login.generateJWTAsync();
    return token;
  },
  /**
   * Set the admin password, only available in development mode
   * @param {{string}} password a string contains password 
   */
  setLoginPassword: async ({ password }) => {
    if (nodeEnv === "Development") {
      const passwordHash = await login.generatePasswordHashAsync(password);
      return await dbServices.setMyPasswordHashAsync(passwordHash);
    }
    throw new Error("Not available in production 🤭");
  }
};

module.exports = { resolvers };