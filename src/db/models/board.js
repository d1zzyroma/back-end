// src/db/models/board.js
import { model, Schema } from 'mongoose';

const boardsSchema = new Schema(
  {
    titleBoard: { type: String, required: true },
    icon: { type: String, required: false },
    background: { type: String},
    filter: { type: String},
    userId: { type: Schema.Types.ObjectId },
    // userId: { type: Schema.Types.ObjectId, ref: 'users' },
    //  createdAt: { type: Date },
    //  updatedAt: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

export const BoardsCollection = model('boards', boardsSchema);
