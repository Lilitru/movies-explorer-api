const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const validateUrl = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message('Значение не является url');
};

const validateCreateUserRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLoginRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateDeleteMovieRequest = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
});

const validateCreateMovieRequest = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(50),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
    movieId: Joi.number().required(),
  }),
});

const validateUpdateUserInfoRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateCreateUserRequest,
  validateLoginRequest,
  validateDeleteMovieRequest,
  validateCreateMovieRequest,
  validateUpdateUserInfoRequest,
};
