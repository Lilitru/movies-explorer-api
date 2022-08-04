const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validateCreateUserRequest, validateLoginRequest } = require('../middlewares/validation');

router.post('/signup', validateCreateUserRequest, createUser);

router.post('/signin', validateLoginRequest, login);

module.exports = router;
