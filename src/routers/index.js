import { Router } from 'express';
import authRouter from './auth.js';
import themeRouter from './theme.js';
import supportRouter from './support.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/theme', themeRouter);
router.use('/support', supportRouter);

export default router;
