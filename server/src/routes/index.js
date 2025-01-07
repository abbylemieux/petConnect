import express from 'express';
import calendarRoutes from './calendarRoutes.js';
import userRoutes from './userRoutes.js'; // Assuming you have user routes

const router = express.Router();

router.use('/calendar', calendarRoutes);
router.use('/users', userRoutes); // Assuming you have user routes

export default router;