import express from 'express';
const router = express.Router();

import { 
  loginWithPi, 
  verifySession 
} from '../controllers/loginController.js';

import { protect } from '../middleware/authMiddleware.js';

/**
 * @route   POST /api/login/pi
 * @desc    Receive Pi UID/Auth results and issue a Palace JWT
 * @access  Public
 */
router.post('/pi', loginWithPi);

/**
 * @route   GET /api/login/status
 * @desc    Check if the current session token is still valid
 * @access  Private
 */
router.get('/status', protect, verifySession);

export default router;
