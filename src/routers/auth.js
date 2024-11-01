import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validations/auth.js';
import { loginUser, logoutUser } from '../services/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post('/login', validateBody(loginUserSchema)),
  ctrlWrapper(loginUser);
authRouter.post('/logout', ctrlWrapper(logoutUser));
authRouter.post('/refresh-session', ctrlWrapper(refreshUserSessionController));
authRouter.patch('/update-profile', ctrlWrapper());

export default authRouter;
