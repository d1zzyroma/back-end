// src/routers/boards.js

import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createBoardSchema } from '../validations/boards.js';
import { createBoardController, getBoardByIdController, getBoardsController } from '../controllers/boards.js';
import { authenticate } from '../middlewares/authenticate.js';

// import {
//   getBoardsController,
//   getBoardByIdController,
//   createBoardController,
//   deleteBoardController,
//   upsertBoardController,
//   patchBoardController,
// } from '../controllers/boards.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import { isValidId } from '../middlewares/boards/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';
// import { upload } from '../middlewares/multer.js';

// import { createBoardSchema, updateBoardSchema } from '../validation/boards.js';

const boardsRouter = Router();

boardsRouter.use('/', authenticate);


boardsRouter.get('/', ctrlWrapper(getBoardsController));

// router.get('/:boardId', isValidId, ctrlWrapper(getBoardByIdController));
boardsRouter.get('/:boardId', ctrlWrapper(getBoardByIdController));

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);

// router.post(
//   '/',
//   // isValidId,
//   upload.single('photo'),
//   validateBody(createBoardSchema),
//   ctrlWrapper(createBoardController),
// );

// router.delete('/:boardId', isValidId, ctrlWrapper(deleteBoardController));

// router.put(
//   '/:boardId',
//   isValidId,
//   upload.single('photo'),
//   validateBody(createBoardSchema),
//   ctrlWrapper(upsertBoardController),
// );

// router.patch(
//   '/:boardId',
//   isValidId,
//   upload.single('photo'),
//   validateBody(updateBoardSchema),
//   ctrlWrapper(patchBoardController),
// );


export default boardsRouter;
