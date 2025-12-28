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
  getUserItems // Combined from your creator items logic
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

/**
 * 1. Base User & Admin Routes
 */
router.route('/')
  .post(registerUser)                             // Public: Register
  .get(protect, admin, getUsers);                 // Admin: List all users

/**
 * 2. Authentication Routes
 */
router.post('/login', authUser);
router.post('/logout', logoutUser);

/**
 * 3. Personal Account Routes
 */
router.route('/profile')
  .get(protect, getUserProfile)                   // Private: Get my profile
  .put(protect, updateUserProfile);                // Private: Update my profile

/**
 * 4. Creator/Inventory Routes
 */
router.get('/items', 
  protect, 
  authorizeRoles('creator'), 
  getUserItems                                    // Private: Fetch creator's Goodz
);

/**
 * 5. Specific User Admin Routes
 */
router.route('/:id')
  .get(protect, admin, getUserById)               // Admin: View user details
  .put(protect, admin, updateUser)                // Admin: Edit user roles/data
  .delete(protect, admin, deleteUser);            // Admin: Permanent removal

export default router;
