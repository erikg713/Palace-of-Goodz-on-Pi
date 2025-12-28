import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public & Protected User Routes
router.route('/')
  .post(registerUser)         // Register a new user
  .get(protect, admin, getUsers); // Admin only: get all users

router.post('/login', authUser);
router.post('/logout', logoutUser);

router.route('/profile')
  .get(protect, getUserProfile)    // Get current user's profile
  .put(protect, updateUserProfile); // Update current user's profile

// Admin-Specific Routes
router.route('/:id')
  .delete(protect, admin, deleteUser) // Admin: delete user
  .get(protect, admin, getUserById)   // Admin: get specific user
  .put(protect, admin, updateUser);    // Admin: update specific user

export default router;
  .delete(protect, admin, deleteUser) // Admin: delete user
  .get(protect, admin, getUserById)   // Admin: get specific user
  .put(protect, admin, updateUser);    // Admin: update specific user

export default router;
