import express from 'express';
const router = express.Router();

import { 
  authPiUser, 
  getMe, 
  refreshPalaceToken 
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';

/**
 * @route   POST /api/auth/pi
 * @desc    Authenticate user via Pi Network SDK data
 * @access  Public
 */
router.post('/pi', authPiUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user data from token
 * @access  Private
 */
router.get('/me', protect, getMe);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh the JWT session
 * @access  Private
 */
router.post('/refresh', protect, refreshPalaceToken);

export default router;import express from 'express';
const router = express.Router();

import { 
  authPiUser, 
  getMe, 
  refreshPalaceToken 
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';

/**
 * @route   POST /api/auth/pi
 * @desc    Authenticate user via Pi Network SDK data
 * @access  Public
 */
router.post('/pi', authPiUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user data from token
 * @access  Private
 */
router.get('/me', protect, getMe);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh the JWT session
 * @access  Private
 */
router.post('/refresh', protect, refreshPalaceToken);

export default router;
