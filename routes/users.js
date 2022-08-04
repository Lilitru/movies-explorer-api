const router = require('express').Router();
const { validateUpdateUserInfoRequest } = require('../middlewares/validation');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', validateUpdateUserInfoRequest, updateUserInfo);

module.exports = router;
