// src/services/boards.js

import { BoardsCollection } from '../db/models/board.js';
import { ColumnsCollection } from '../db/models/columns.js';
import { CardsCollection } from '../db/models/card.js';
//import createHttpError from 'http-errors';
//import { faker } from '@faker-js/faker';
//import { calculatePaginationData } from '../utils/calculatePaginationData.js';
//import { SORT_ORDER } from '../constants/index.js';

// ----- Create Board -----
export const createBoard = (payload, user) => BoardsCollection.create({
    ...payload,
    owner: user._id,
  });

  // ----- Get Board By Id -----
  export const getBoardById = (boardId) => BoardsCollection.findById(boardId);




export const getAllBoards = async (user) => {
  const boards = await BoardsCollection.find({ owner: user });
  return boards;
};


// export const getAllColumnsByBoardId = async (boardId, user) => {
//   const columns = await ColumnsCollection.find({
//     boardId: boardId,
//     userId: user,
//   });
//   return columns;
// };

export const getAllCardsByBoardId = async (boardId, user) => {
  const cards = await CardsCollection.find({
    boardId: boardId,
    userId: user,
  });
  return cards;
};



export const deleteBoard = async (boardId, userId) => {
  const board = await BoardsCollection.findOneAndDelete({
    _id: boardId,
    owner: userId,
  });

  return board;
};

export const updateBoard = async (boardId, payload, options = {}) => {
  const rawResult = await BoardsCollection.findOneAndUpdate(
    { _id: boardId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    board: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

// =========================== Servises що були зміннені ================

// export const createBoard = async (payload, user, photoUrl) => {
//   const board = await BoardsCollection.create({
//     ...payload,
//     owner: user._id,
//     background: photoUrl,
//   });

//   return board;
// };


// export const getBoardById = async (boardId, user) => {
//   const board = await BoardsCollection.findById(boardId);
//   if (board.owner.toString() === user._id.toString()) {
//     return board;
//   } else {
//     return;
//   }
// };
