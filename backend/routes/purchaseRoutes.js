import express from 'express';
const router = express.Router();

import {
  createPurchaseIntent,
  verifyPiPayment,
  getPurchaseHistory,
  getPurchaseById,
  updateDeliveryStatus
} from '../controllers/purchaseController.js';

import { protect, admin } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

/**
 * 1. Transaction Lifecycle
 */

// Step 1: Initialize a purchase (Public/Protected)
// Creates a record in your DB before the Pi Wallet opens
router.post('/intent', protect, createPurchaseIntent);

// Step 2: Server-side verification of the Pi Blockchain transaction
// This is called by your frontend after the Pi SDK returns 'onReadyForServerApproval'
router.post('/verify', protect, verifyPiPayment);

/**
 * 2. User Purchase History
 */
router.route('/my-orders')
  .get(protect, getPurchaseHistory);

/**
 * 3. Order Management & Admin/Creator Controls
 */
router.route('/:id')
  .get(protect, getPurchaseById)
  // Creators or Admins can update shipping/delivery status
  .put(protect, authorizeRoles('creator', 'admin'), updateDeliveryStatus);

export default router;
