import { Router } from 'express';

const router = Router();

router.post('/signin', (req, res, next) => {
  res.send('sign in');
  next();
});

router.post('/signup', (req, res, next) => {
  res.send('sign up');
  next();
});

export default router;
