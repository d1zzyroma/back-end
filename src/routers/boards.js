// src/routers/boards.js

import { Router } from 'express';

import {
  getBoardsController,
  getBoardByIdController,
  createBoardController,
  deleteBoardController,
  upsertBoardController,
  patchBoardController,
} from '../controllers/boards.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/boards/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

import { createBoardSchema, updateBoardSchema } from '../validations/boards.js';

const boardsRouter = Router();

boardsRouter.use('/',authenticate); // аутентифікація user і  запис user в  req.user через middleware

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController)
);

boardsRouter.get('/:boardId',
  isValidId,
  ctrlWrapper(getBoardByIdController)
);

// boardsRouter.get('/', ctrlWrapper(getBoardsController));



// boardsRouter.post(
//   '/register',
//   validateBody(createBoardSchema),
//   ctrlWrapper(createBoardController),
// );



// boardsRouter.delete('/:boardId', isValidId, ctrlWrapper(deleteBoardController));

// boardsRouter.put(
//   '/:boardId',
//   isValidId,
//   //upload.single('background'),
//   validateBody(createBoardSchema),
//   ctrlWrapper(upsertBoardController),
// );

// boardsRouter.patch(
//   '/:boardId',
//   isValidId,
//   upload.single('background'),
//   validateBody(updateBoardSchema),
//   ctrlWrapper(patchBoardController),
// );
export default boardsRouter;





// =========== Змінені роути =======

// boardsRouter.post(
//   '/',
//   isValidId,
//   upload.single('background'),
//   validateBody(createBoardSchema),
//   ctrlWrapper(createBoardController),
// );
