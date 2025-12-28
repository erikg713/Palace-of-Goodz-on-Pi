const config = require('../config');

/**
 * Palace of Goodz - Error Handling Middleware
 * Handles 404 (Not Found) and 500 (Server Error) events.
 */

// 1. Catch-all for routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// 2. Global Error Handler (The Final Safety Net)
const errorHandler = (err, req, res, next) => {
  // Sometimes errors arrive with a 200 status; we force it to 500 if so
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred in the Palace.',
    // Only show stack trace in development mode for security
    stack: config.env === 'production' ? '🛡️' : err.stack,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};
