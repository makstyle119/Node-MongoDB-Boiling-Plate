const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const { NODE_ENV, SECRET_KEY } = require('../../config');
var jwt = require('jsonwebtoken');
require('../../Constant');
require('../../log');

// For Password
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const Register = async (req, res) => {
  const {
    FirstName,
    LastName,
    Username,
    Email,
    DisplayName,
    Password,
    ProfilePicUrl,
    CreatedBy,
    CreatedOn,
  } = req.body;
  try {
    const result = await new User({
      FirstName,
      LastName,
      Username,
      Email,
      DisplayName,
      Password: bcrypt.hashSync(Password, salt),
      ProfilePicUrl,
      CreatedBy,
      CreatedOn,
    }).save();
    if (result) {
      res.status(200).json({
        message: 'User registered successfully..',
        result,
      });
    } else {
      throw new Error(USER_REGISTRATION_FAILED);
    }
  } catch (e) {
    if (NODE_ENV === PRODUCTION) {
      await Log(`${USER_REGISTRATION} ` + e);
    } else if (NODE_ENV === DEVELOPMENT) {
      console.log(e);
    }
    await res.status(400).send({ message: USER_REGISTRATION_FAILED });
  }
};

const Login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    if (!Email || !Password) {
      return res.status(422).json({ message: PLEASE_ADD_EMAIL_OR_PASSWORD });
    }
    User.findOne({ Email }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ message: USER_NOT_FOUND });
      }
      bcrypt.compare(Password, savedUser.Password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ savedUser }, SECRET_KEY);
          res.json({ token, user: savedUser });
        } else {
          return res
            .status(422)
            .json({ message: INVALID_PASSWORD_OR_MAYBE_USER_DOES_NOT_EXIST });
        }
      });
    });
  } catch (e) {
    if (NODE_ENV === PRODUCTION) {
      await Log(`${USER_LOGIN} ` + e);
    } else if (NODE_ENV === DEVELOPMENT) {
      console.log(e);
    }
    await res.status(400).send({ message: USER_LOGIN_FAILED });
  }
};

module.exports = { Register, Login };
