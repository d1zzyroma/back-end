import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    theme: { type: String, required: true },
    avatarUrl: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const User = model('users', userSchema);
