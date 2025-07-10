import express from 'express';
import { getMe, getAllUsers, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.get('/me', protect, getMe);
router.get('/', protect, isAdmin, getAllUsers);
router.delete('/:id', protect, isAdmin, deleteUser);
export default router;
