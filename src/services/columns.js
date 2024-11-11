import { ColumnsCollection } from '../db/models/columns.js';

// ----- Create column
export const createColumn = (title, boardId) =>
  ColumnsCollection.create({title, boardId});

// ----- Get All Column -----
export const getAllColumnsByBoardId = (boardId) =>
  ColumnsCollection.find({ boardId });

// ----- Update Column -----
export const updateColumn = (columnId, titleColumn) =>
  ColumnsCollection.findByIdAndUpdate({_id: columnId},  titleColumn , { new: true });

// ----- Delete Column By Id -----
export const deleteColumn = (columnId) =>
  ColumnsCollection.findByIdAndDelete(columnId);

// ----- Delete Columns By Board Id -----
export const deleteColumnsByBoardId = (boardId) =>
  ColumnsCollection.deleteMany({boardId});

