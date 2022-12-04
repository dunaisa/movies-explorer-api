const router = require('express').Router();

const { auth } = require('../middlewares/auth');

const {
  ObjectNotFound,
} = require('../errors/ObjectNotFound');

const {
  createUser,
  login,
} = require('../controllers/users');

const { validateCreateUser, validateUserLogin } = require('../middlewares/validateJoi');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateUserLogin, login);

router.use(auth);

router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use('/*', (req, res, next) => {
  next(new ObjectNotFound('Запрашиваемый путь не существует.'));
});

module.exports = router;
