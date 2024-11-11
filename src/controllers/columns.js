
import createHttpError from 'http-errors';
import {
  createColumn,
  updateColumn,
  deleteColumn,
} from '../services/columns.js';
import { deleteCardsById } from '../services/card.js';

// ----- Create Column -----
export const createColumnController = async (req, res) => {
  const {title}  = req.body;
  const { boardId } = req.params;
  const column = await createColumn(title, boardId);

  res.status(201).json({
    status: 201,
    messsage: 'Column created successfully',
    data: column,
  });
};

// ----- Update Column -----
export const updateColumnController = async (req, res) => {
  const titleColumn  = req.body;
  const  {columnId } = req.params;
  const column = await updateColumn(columnId, titleColumn);

  if (!column) {
        throw createHttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Column updated successfully',
    data: column,
  });
};

// ----- Delete Column By Id -----
export const deleteColumnController = async (req, res) => {
  const { columnId } = req.params;
  await deleteCardsById(columnId);
  await deleteColumn(columnId);

  res.status(204).json({
    status:204,
    message: 'Column deleted successfully',
  });
};
