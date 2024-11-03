import { Router } from 'express';
import authRouter from './auth.js';
import cardsRouter from './card.js';
import supportRouter from './support.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/card', cardsRouter);
router.use('/support', supportRouter);

export default router;
