const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { auth } = require('../middlewares/auth');

const {
  ObjectNotFound,
} = require('../errors/ObjectNotFound');

const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use('/*', (req, res, next) => {
  next(new ObjectNotFound('Запрашиваемый путь не существует.'));
});

module.exports = router;
