const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { handleCors } = require('./middlewares/cors');

const { handleErrors } = require('./middlewares/centralizedErrors');

const { NODE_ENV, DATA_BASE } = process.env;

const { PORT = 3001 } = process.env;
const app = express();

// cors
app.use(handleCors);

if (NODE_ENV === 'production') {
  mongoose.connect(DATA_BASE);
} else {
  mongoose.connect('mongodb://localhost:27017/moviesdb');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
