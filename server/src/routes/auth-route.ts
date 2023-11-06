import { Router } from 'express';
import authController from '../controllers/auth/index.js';

const router = Router();

router.post('/login', authController.signIn);
router.post('/register', authController.signUp);
router.post('/logout', authController.signOut);

export default router;
