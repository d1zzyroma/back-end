import { Router } from 'express';
import authRouter from './auth.js';
import cardsRouter from './card.js';
import themeRouter from './theme.js';
import supportRouter from './support.js';
import boardsRouter from './boards.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/boards', boardsRouter);
router.use('/card', cardsRouter);
router.use('/theme', themeRouter);
router.use('/support', supportRouter);

export default router;
