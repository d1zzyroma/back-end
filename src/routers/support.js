import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { sendSupportMessageController } from '../controllers/support.js';
import { validateBody } from '../middlewares/validateBody.js';
import { supportSchema } from '../validations/support.js';

const supportRouter = Router();

supportRouter.post(
  '/',
  ctrlWrapper(sendSupportMessageController),
  validateBody(supportSchema),
);

export default supportRouter;
