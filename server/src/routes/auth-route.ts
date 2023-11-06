import { Router } from 'express';
import authController from '../controllers/auth/index.js';

const router = Router();

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.post('/logout', authController.signOut);

export default router;
