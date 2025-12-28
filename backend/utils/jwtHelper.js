const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config');

/**
 * Palace of Goodz - JWT Signer
 * Generates a token containing the user's ID and Role
 */
exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, pi_uid: user.pi_uid },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secret);
};
