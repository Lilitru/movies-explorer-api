const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(50),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().required(),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
    movieId: Joi.string().required(),
  }),
}), createMovie);

router.delete('/_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().alphanum().length(24),
  }),
}), deleteMovie);

module.exports = router;
