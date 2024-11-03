// src/services/boards.js

import { BoardsCollection } from '../db/models/board.js';
//import createHttpError from 'http-errors';
//import { faker } from '@faker-js/faker';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

/* export const getAllBoards = async (
  {
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  },
  user,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const boardsQuery = BoardsCollection.find({ userId: user });

  const boardsCount = await BoardsCollection.find({ userId: user })
    .merge(boardsQuery)
    .countDocuments();

  const boards = await boardsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(boardsCount, perPage, page);

  return {
    data: boards,
    ...paginationData,
  };
}; */

export const getAllBoards = async (user) => {
  const boards = await BoardsCollection.find({ userId: user });
  return boards;
};

export const getBoardById = async (boardId, user) => {
  const board = await BoardsCollection.findById(boardId);

  if (board.userId.toString() === user._id.toString()) {
    return board;
  } else {
    return;
  }
};

export const createBoard = async (payload, user, photoUrl) => {
  const board = await BoardsCollection.create({
    ...payload,
    userId: user._id,
    background: photoUrl,
  });

  return board;
};

export const deleteBoard = async (boardId, userId) => {
  const board = await BoardsCollection.findOneAndDelete({
    _id: boardId,
    userId: userId,
  });
  // delete all colums with boardId in Column collections
  //delete all tasks with boardId in tasks collections
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
