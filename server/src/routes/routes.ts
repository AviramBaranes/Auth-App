import express from 'express';

import { signup, login, isAuth } from '../controller/auth';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.post('/private', isAuth);

router.get('/public', (req, res, next) => {
  res.status(200).json({ message: 'here is your public resource' });
});

router.use('/', (req, res, next) => {
  res.status(404).json({ error: 'page not found' });
});

export default router;
