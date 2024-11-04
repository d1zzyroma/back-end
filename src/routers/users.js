import { Router } from 'express';
import {
  deleteUserController,
  getCurrentUserController,
  patchThemeController,
  updateUserProfileController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  // userUpdateProfileSchema,
  userUpdateThemeSchema,
} from '../validations/users.js';

const usersRouter = Router();

usersRouter.get('/current-user/:userId', ctrlWrapper(getCurrentUserController));

usersRouter.patch(
  '/profile/:userId',
  // upload.single('avatar'),
  ctrlWrapper(updateUserProfileController),
);

usersRouter.patch(
  '/change-theme',
  validateBody(userUpdateThemeSchema),
  ctrlWrapper(patchThemeController),
);

usersRouter.delete('/delete-user', deleteUserController);

export default usersRouter;
