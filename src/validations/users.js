import Joi from 'joi';

export const userUpdateProfileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(4),
});

export const userUpdateThemeSchema = Joi.object({
  theme: Joi.string().valid('dark', 'light', 'violet').required(),
});
