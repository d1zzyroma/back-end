import { ColumnsCollection } from '../db/models/columns.js';

export const createColumn = (titleColumn, userId, boardId) =>
  ColumnsCollection.create({ titleColumn, userId, boardId });

export const getAllColumnsByBoardId = (boardId) =>
  ColumnsCollection.find({ boardId: boardId });
