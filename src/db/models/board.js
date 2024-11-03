// src/db/models/board.js
import { model, Schema } from 'mongoose';

const boardsSchema = new Schema(
  {
    title: { type: String, required: true },
    icons: { type: String, required: false },
    background: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    //  createdAt: { type: Date },
    //  updatedAt: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

export const BoardsCollection = model('boards', boardsSchema);
