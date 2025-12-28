import jwt from 'jsonwebtoken';

/**
 * Generates a JWT and sets it as an HTTP-only cookie.
 * @param {Object} res - The Express response object.
 * @param {string} userId - The ID of the authenticated user.
 */
const generateToken = (res, userId) => {
  // 1. Create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });

  // 2. Set the JWT as an HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Shield against XSS attacks
    secure: process.env.NODE_ENV !== 'development', // Only use HTTPS in production
    sameSite: 'strict', // Shield against CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // Matches expiresIn (30 days)
  });
};

export default generateToken;
