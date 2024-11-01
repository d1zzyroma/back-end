// src/validation/boards.js

import Joi from 'joi';

export const createBoardSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email(),
  contactType: Joi.string().valid('home', 'personal', 'work'),
  phoneNumber: Joi.string().min(3).max(30).required(),
  isFavorite: Joi.boolean(),
  // userId: Joi.string().required(),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  contactType: Joi.string().valid('home', 'personal', 'work'),
  phoneNumber: Joi.string().min(3).max(30),
  isFavorite: Joi.boolean(),
});

const dataToValidate = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  isFavorite: 'personel',
  phoneNumber: '+380505055555',
  contactType: false,
};

const validationResult = createBoardSchema.validate(dataToValidate, {
  abortEarly: false,
});
if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}
