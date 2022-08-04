const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');

module.exports.getUserInfo = (req, res, next) => {
  user.findById(req.user._id)
    .then((currentUser) => {
      if (!currentUser) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        return res.send(currentUser);
      }
    })
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email, id = req.user._id } = req.body;

  user.findByIdAndUpdate(
    id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((newUser) => {
      if (!newUser) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send(newUser);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictingRequestError('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  user.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictingRequestError('Пользователь с таким email уже существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => user.create({
          name, email, password: hash,
        }))
        .then((createdUser) => user.findOne({ _id: createdUser._id }))
        .then((userWithoutPass) => {
          res.status(201).send(userWithoutPass);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.code === 11000) {
        next(new ConflictingRequestError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  user.findUserByCredentials(email, password)
    .then((currentUser) => {
      // создадим токен
      const token = jwt.sign({ _id: currentUser._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      // вернём токен
      return res.status(200).send({ message: 'Авторизация пройдена', token });
    })
    .catch((err) => next(err));
};
