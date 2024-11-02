import { Router } from 'express';
import authRouter from './auth.js';
import cardsRouter from './card.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/card', cardsRouter);

export default router;
