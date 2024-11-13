import Joi from 'joi';

export const createCardSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().required(),
  deadline: Joi.string(),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Without priority'),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().min(3).max(20),
  description: Joi.string().min(3),
  deadline: Joi.string(),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Without priority'),
});

export const replaceColumnSchema = Joi.object({
  columnId: Joi.string().required(),
});


