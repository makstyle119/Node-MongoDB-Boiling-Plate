const express = require('express');

const router = express.Router();

// User
const User = require('./controllers/User');
router.post('/user/register', User.Register);
router.post('/user/login', User.Login);

module.exports = router;
