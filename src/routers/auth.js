import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { refreshUserSessionController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register');
authRouter.post('/login');
authRouter.post('/logout');
authRouter.post('/refresh-session', ctrlWrapper(refreshUserSessionController));
authRouter.patch('/update-profile', ctrlWrapper());

export default authRouter;
