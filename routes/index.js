const express = require('express');

const router = express.Router();

// User
const User = require('../Controllers/User');
router.get('/user/count', User.UserCount);
router.post('/user/register', User.Register);
router.post('/user/login', User.Login);
router.put('/user/update', User.ProfileUpdate);
router.put('/user/passwordUpdate', User.PasswordUpdate);
router.delete('/user/delete', User.DeleteUser);

module.exports = router;
