import express from 'express';
const router = express.Router();

import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getTopItems,
  getItemsByCategory
} from '../controllers/itemController.js';

import { protect, admin } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; // Multer configuration

/**
 * 1. Public Discovery Routes
 * These are accessible to anyone browsing the Palace.
 */
router.get('/', getItems);
router.get('/top', getTopItems);
router.get('/category/:category', getItemsByCategory);
router.get('/:id', getItemById);

/**
 * 2. Protected Inventory Management
 * Only authenticated 'creators' or 'admins' can modify the marketplace.
 */

// Create a new Good: requires auth, creator role, and image upload
router.post(
  '/', 
  protect, 
  authorizeRoles('creator', 'admin'), 
  upload.single('image'), 
  createItem
);

// Update or Remove a Good
router.route('/:id')
  .put(
    protect, 
    authorizeRoles('creator', 'admin'), 
    upload.single('image'), 
    updateItem
  )
  .delete(
    protect, 
    authorizeRoles('creator', 'admin'), 
    deleteItem
  );

export default router;
