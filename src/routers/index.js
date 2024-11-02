import { Router } from 'express';
import cardsRouter from './card.js';

const router = Router();

// router.use('auth', )
router.use('/card', cardsRouter);

export default router;
