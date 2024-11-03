import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { themeController } from '../controllers/theme.js';

const themeRouter = Router() ;

themeRouter.patch('/create', ctrlWrapper(themeController));

export default themeRouter;
