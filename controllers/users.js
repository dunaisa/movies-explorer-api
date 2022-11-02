const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  BadRequest,
} = require('../errors/BadRequest');

const {
  ObjectNotFound,
} = require('../errors/ObjectNotFound');

const {
  ConflictError,
} = require('../errors/ConflictError');

const {
  UnauthorizedError,
} = require('../errors/UnauthorizedError');

// Создает пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => res.send(data))
    .catch((errors) => {
      if (errors.code === 11000) {
        return next(new ConflictError('Пользователь с такой почтой уже существует.'));
      } if (errors.name === 'ValidationError') {
        return next(new BadRequest('Некорректные данные при создании карточки.'));
      }
      return next(errors);
    });
};

// Обновляет профиль
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(new ObjectNotFound('Пользователь не найден.'))
    .then((user) => res.send(user))
    .catch((errors) => {
      if (errors.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные.'));
      }
      return next(errors);
    });
};

// Проверяет соответсвие логина

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Необходима авторизация.'));
    })
    .catch(next);
};

// Возвращает пользователя
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new ObjectNotFound('Пользователь не найден.'))
    .then(({ name, email }) => { return res.send({ name, email }) })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  updateUserInfo,
  getCurrentUser,
};
