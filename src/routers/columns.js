
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js'; // Waiting for auth
import {
  createColumnController,
  updateColumnController,
  deleteColumnController,
} from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createColumnsSchema, updateColumnsSchema } from '../validations/columns.js';
import { isValidId } from '../middlewares/isValidId.js';


const columnsRouter = Router();
columnsRouter.use('/', authenticate);
columnsRouter.use('/:boardId', isValidId('boardId'));
columnsRouter.use('/:columnId', isValidId('columnId'));

columnsRouter.post(
  '/:boardId',
  validateBody(createColumnsSchema),
  ctrlWrapper(createColumnController),
);

columnsRouter.patch(
  '/:columnId',
  validateBody(updateColumnsSchema),
  ctrlWrapper(updateColumnController),
);

columnsRouter.delete(
  '/:columnId',
  ctrlWrapper(deleteColumnController),
);



export default columnsRouter;
