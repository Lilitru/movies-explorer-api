const { ERROR_CODE_500 } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = ERROR_CODE_500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === ERROR_CODE_500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};

module.exports = errorHandler;
