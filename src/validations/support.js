import Joi from 'joi';

export const supportSchema = Joi.object({
  email: Joi.string().email().required(),
  message: Joi.string().min(3).max(200).required(),
});
