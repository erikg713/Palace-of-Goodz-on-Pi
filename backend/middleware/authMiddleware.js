const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Palace of Goodz - Authentication Middleware
 * Validates the JWT sent in the Authorization header.
 */
const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers (format: Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token using the secret from config.js
      const decoded = jwt.verify(token, config.jwt.secret);

      // 4. Attach user data to the request object for use in controllers
      req.user = {
        id: decoded.id,
        pi_uid: decoded.pi_uid,
        role: decoded.role
      };

      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token found' });
  }
};

/**
 * Role-Based Access Control (RBAC)
 * Limits access to specific roles (e.g., only 'creator' can upload)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role '${req.user.role}' is not authorized to access this route` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
