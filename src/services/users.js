import { UserCollection } from '../db/models/user.js';

export const deleteUser = async (req, res) => {
  const { _id } = req.user;
  await UserCollection.findOneAndDelete({ _id });
};

export const updateUserProfile = async (userId, userData) => {
  return await UserCollection.findByIdAndUpdate({ _id: userId }, userData, {
    new: true,
    includeResultMetadata: true,
  });
};
