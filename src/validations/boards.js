import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  background: Joi.string(),
  icon: Joi.string(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  background: Joi.string(),
  icon: Joi.string(),
});
