// src/controllers/boards.js

import {
  getAllBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  updateBoard,
} from '../services/boards.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/boards/parsePaginationParams.js';
import { parseSortParams } from '../utils/boards/parseSortParams.js';
import { parseFilterParams } from '../utils/boards/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/boards/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/boards/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getBoardsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const user = req.user._id;
  const contacts = await getAllBoards(
    {
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    },
    user,
  );

  res.json({
    status: 200,
    message: 'Successfully found boards!',
    data: contacts,
  });
};

export const getBoardByIdController = async (req, res) => {
  const { boardId } = req.params;
  const user = req.user;
  try {
    const board = await getBoardById(boardId, user);

    if (!board) {
      throw createHttpError(404, 'Board not found');
    }

    // Відповідь, якщо board знайдено
    res.json({
      status: 200,
      message: `Successfully found board with id ${boardId}!`,
      data: board,
    });
  } catch (err) {
    throw createHttpError(404, `Board with Id: ${boardId} not found`);
  }
};

export const createBoardController = async (req, res, next) => {
  const photo = req.file;
  //console.log('create post board in controller photo:', req.file);
  let photoUrl = '';
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  // console.log('photoUrl in controller:', photoUrl);
  const board = await createBoard(req.body, req.user, photoUrl);
  res.status(201).json({
    status: 201,
    message: `Successfully created a board!`,
    data: board,
  });
};

export const deleteBoardController = async (req, res, next) => {
  const { boardId } = req.params;
  const board = await deleteBoard(boardId);
  if (!board) {
    next(createHttpError(404, `Board with Id  ${boardId} not found in db!`));
    return;
  }
  res.status(204).send();
};

export const upsertBoardController = async (req, res, next) => {
  const { boardId } = req.params;
  const result = await updateBoard(boardId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, `Board with Id ${boardId}  not found !`));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully update a board Id ${boardId} !`,
    data: result.board,
  });
};

export const patchBoardController = async (req, res, next) => {
  const { boardId } = req.params;
  const photo = req.file;
  //console.log('photo in controller:', photo);
  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateBoard(boardId, {
    ...req.body,
    background: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, `Board with Id ${boardId} not found`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a board Id: ${boardId}!`,
    data: result.board,
  });
};
