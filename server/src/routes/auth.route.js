import express from 'express';
import { login, signup, logout, resetPassword, updateProfile, checkAuth, forgotPassword } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { resetPasswordLimiter } from '../middlewares/rateLimit.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

router.post('/forgot-password', resetPasswordLimiter, forgotPassword)
router.patch('/reset-password/:token', resetPasswordLimiter, resetPassword);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute,  checkAuth)


export default router;