require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  
  // Database - Standard Environment Variables
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'palace_db',
  },

  // Pi Network SDK
  pi: {
    apiKey: process.env.PI_API_KEY,
  },

  // Security
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },

  // Local File Storage
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
};

module.exports = config;
