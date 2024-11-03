import { Router } from 'express';
import authRouter from './auth.js';
import themeRouter from './theme.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/theme', themeRouter);

export default router;
