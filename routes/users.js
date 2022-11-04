const router = require('express').Router();

const {
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/users');
const { validatePatchUserInfo } = require('../middlewares/validateJoi');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validatePatchUserInfo, updateUserInfo);

module.exports = router;
