const router = require('express').Router();
const { validateCreateMovieRequest, validateDeleteMovieRequest } = require('../middlewares/validation');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovie);

router.post('/', validateCreateMovieRequest, createMovie);

router.delete('/:_id', validateDeleteMovieRequest, deleteMovie);

module.exports = router;
