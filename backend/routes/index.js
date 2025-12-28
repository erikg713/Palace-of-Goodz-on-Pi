import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import itemRoutes from './itemRoutes.js';
import purchaseRoutes from './purchaseRoutes.js';

const router = express.Router();

// Mounting the specific sub-routers
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/purchases', purchaseRoutes);

export default router;
