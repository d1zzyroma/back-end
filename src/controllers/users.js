// import fs from 'fs/promises';
import createHttpError from 'http-errors';
import { deleteUser, updateUserProfile } from '../services/users.js';
// import { saveImageToCloudinary } from '../utils/saveImageToCloudinary.js';
// import { UserCollection } from '../db/models/user.js';
// import { parse } from 'path';
// import bcrypt from 'bcrypt';
import { findUserById } from '../services/auth.js';

export const getCurrentUserController = async (req, res) => {
  const { userId } = req.params;

  const user = await findUserById(userId);

  if (!user) {
    throw createHttpError(401, 'User unauthorized');
  }
  console.log(user);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    theme: user.theme,
  });
};

export const updateUserProfileController = async (req, res) => {
  const { userId } = req.params;

  const userData = req.body;

  const user = await updateUserProfile(userId, { ...userData });
  console.log(user);

  // if (!user.value) {
  //   throw createHttpError(404, {
  //     status: '404',
  //     message: `User with id ${userId} not found!`,
  //   });
  // }

  res.send({
    status: 200,
    message: `Successfully updated a user!`,
    data: user.value,
  });
};

// export const patchAvatarController = async (req, res) => {
//   const { _id } = req.user;
//   const { path, originalname } = req.file;

//   const { name: fileName } = parse(originalname);

//   const options = {
//     public_id: `${_id}_${fileName}`,
//     unique_filename: false,
//     overwrite: true,
//     folder: 'avatars',
//     transformation: [{ height: 100, width: 100, crop: 'scale' }],
//   };

//   try {
//     const { url } = await saveImageToCloudinary.uploader.upload(path, options);

//     const user = await UserCollection.findOneAndUpdate(
//       { _id },
//       { avatarURL: url },
//       { new: true },
//     );

//     if (!user) {
//       throw createHttpError(404, `User find`);
//     }

//     if (path) {
//       await fs.unlink(path);
//     }

//     res.json({
//       message: 'Operation is successfully',
//       avatarURL: user.avatarURL,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const patchProfileController = async (req, res) => {
//   const { _id } = req.user;
//   const { name, email, password } = req.body;

//   const updateFields = {};

//   if (name) updateFields.name = name;
//   if (email) updateFields.email = email;
//   if (password) {
//     updateFields.password = await bcrypt.hash(password, 10);
//   }

//   try {
//     const user = await UserCollection.findByIdAndUpdate(_id, updateFields, {
//       new: true,
//     });

//     if (!user) {
//       throw createHttpError(404, `User not found`);
//     }

//     res.json({
//       message: 'Profile updated successfully',
//       name: user.name,
//       email: user.email,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const patchThemeController = (req, res) => {};
export const deleteUserController = async (req, res) => {
  const user = await deleteUser(req.body);
  if (!user) {
    throw createHttpError(404, `User not found`);
  }

  res.status(204).json({ message: 'Successful operation' });
};
