import { Router } from 'express';
import authRouter from './auth.js';
import boardsRouter from './boards.js';
const router = Router();

router.use('/auth', authRouter);
router.use('/boards', boardsRouter);

export default router;
