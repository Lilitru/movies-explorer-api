const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./auth');

router.use('/', authRouter);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Not found'));
});

module.exports = router;
