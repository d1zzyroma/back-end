import Joi from 'joi';

export const userUpdateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
});

export const userUpdateThemeSchema = Joi.object({
  theme: Joi.string().valid('dark', 'light', 'violet').required(),
});


