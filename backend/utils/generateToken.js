const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Palace of Goodz - JWT Generator
 * Creates a signed token to maintain user sessions across the standalone project.
 * * @param {Object} user - The user object from your database
 * @returns {String} - Encrypted JWT string
 */
const generateToken = (user) => {
  // We only encode the essentials: database ID, Pi UID, and Palace Role
  const payload = {
    id: user.id,
    pi_uid: user.pi_uid,
    role: user.role
  };

  // Sign the token using the secret from your backend/config.js
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn || '7d', // Default to 7 days if not specified
  });
};

module.exports = generateToken;
