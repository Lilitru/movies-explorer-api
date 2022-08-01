require('dotenv').config();

const { NODE_ENV, DB_CONNECTION } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

const routers = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');

const PORT = 3000;

const app = express();

app.use(cors);
app.use(bodyParser.json()); // для собирания JSON-формата

app.use(requestLogger); // логгер запросов
app.use(routers);

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECTION : 'mongodb://localhost:27017/moviesdb');

app.use(errorLogger); // логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
