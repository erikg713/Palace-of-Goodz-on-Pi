const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Palace of Goodz - Route Protection Middleware
 * Strictly enforces that only authenticated and authorized users 
 * can access specific project endpoints.
 */
const protectRoutes = (req, res, next) => {
  // 1. Check for the existence of the token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. Please enter the Palace through the main gates (Login)."
    });
  }

  // 2. Extract and Verify
  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, config.jwt.secret);
    
    // 3. Attach verified user to Request
    req.user = verified; 
    
    // 4. Permission Check: Ensure the user has a valid ID mapped in the project
    if (!req.user.id) {
      throw new Error('Malformed Token: No User ID found.');
    }

    next();
  } catch (error) {
    console.error("Palace Security Breach/Error:", error.message);
    res.status(403).json({
      success: false,
      message: "Invalid or Expired Palace Key. Access Revoked."
    });
  }
};

module.exports = protectRoutes;
