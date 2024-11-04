// import express from 'express';
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js'; // Waiting for auth
import { createColumnController } from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createColumnsSchema } from '../validations/columns.js';
// import { boardSchema } from '../../models/board/'; // Waiting for boardSchema


const columnsRouter = Router();
// const router = express.Router();
columnsRouter.use('/', authenticate);

columnsRouter.post('/:boardId',validateBody(createColumnsSchema),ctrlWrapper(createColumnController));

// router.post(
//   '/:boardId',
//   validateBody(boardSchema.addColumn),
//   authenticate,
//   ctrlWrapper.addColumnInBoard,
// );

// router.get('/:boardId', authenticate, ctrlWrapper.getColumns);

// router.put('/', authenticate, ctrlWrapper.updateColumn);

// router.delete('/', authenticate, ctrlWrapper.deleteColumn);

// module.exports = router;
export default columnsRouter;
