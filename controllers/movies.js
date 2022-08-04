const movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovie = (req, res, next) => {
  movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, owner = req.user._id, movieId, nameRU, nameEN,
  } = req.body;

  movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные.'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  movie.findById(req.params._id)
    .then((existingMovie) => {
      if (!existingMovie) {
        throw new NotFoundError('Фильм не найден');
      } else if (existingMovie.owner.toString() === req.user._id) {
        return existingMovie.remove()
          .then((removedMovie) => res.send(removedMovie));
      } else {
        throw new ForbiddenError('Пользователь не может удалить фильм, добавленный другим пользователем');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};
