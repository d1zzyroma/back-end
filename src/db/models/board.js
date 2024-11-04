// src/db/models/board.js
import { model, Schema } from 'mongoose';

const boardsSchema = new Schema(
  /*   {
    title: { type: String, required: true },
    icons: { type: String, required: false },
    background: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true, versionKey: false }, */

  {
    title: {
      type: String,
      required: [true, "Set the board's title"],
    },
    icon: { type: String, required: true },
    background: {
      min: { type: String },
      desktop: { type: String },
      tablet: { type: String },
      mobile: { type: String },
    },
    filter: {
      type: String,
      enum: ['default', 'without', 'low', 'medium', 'high'],
      default: 'default',
    },
    columns: [
      {
        title: { type: String, required: true },
        owner: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        cards: [
          {
            title: { type: String, required: true },
            text: { type: String, required: true },
            priority: {
              type: String,
              enum: ['without', 'low', 'medium', 'high'],
              default: 'without',
            },
            deadline: { type: String, required: true },
            owner: {
              type: Schema.Types.ObjectId,
              required: true,
            },
          },
        ],
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const BoardsCollection = model('boards', boardsSchema);
