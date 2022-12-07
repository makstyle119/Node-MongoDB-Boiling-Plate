const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { NODE_ENV, SECRET_KEY } = require('../config');
const Logger = require('node-error-logger.js');
var jwt = require('jsonwebtoken');
require('../Constant');

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
				success: true,
				message: USER_CREATE_SUCCESSFULLY,
				result,
			});
		} else {
			res.status(400).json({
				success: true,
				message: USER_REGISTRATION_FAILED,
				result,
			});
		}
	} catch (e) {
		if (NODE_ENV === PRODUCTION) {
			await Logger(`${USER_REGISTRATION} ` + e);
		} else if (NODE_ENV === DEVELOPMENT) {
			console.log(e);
		}
		await res
			.status(400)
			.send({ success: false, message: USER_REGISTRATION_FAILED });
	}
};

const Login = async (req, res) => {
	const { Email, Password } = req.body;
	try {
		if (!Email || !Password) {
			return res
				.status(422)
				.json({ success: false, message: PLEASE_ADD_EMAIL_OR_PASSWORD });
		}
		User.findOne({ Email }).then((savedUser) => {
			if (!savedUser) {
				return res
					.status(422)
					.json({ success: false, message: USER_NOT_FOUND });
			} else if (savedUser?.IsDeleted === true) {
				return res.status(422).json({ success: false, message: DELETED_USER });
			}
			bcrypt.compare(Password, savedUser.Password).then((doMatch) => {
				if (doMatch) {
					const token = jwt.sign({ savedUser }, SECRET_KEY);
					res.json({ token, success: true, user: savedUser });
				} else {
					return res
						.status(422)
						.json({ message: INVALID_PASSWORD_OR_MAYBE_USER_DOES_NOT_EXIST });
				}
			});
		});
	} catch (e) {
		if (NODE_ENV === PRODUCTION) {
			await Logger(`${USER_LOGIN} ` + e);
		} else if (NODE_ENV === DEVELOPMENT) {
			console.log(e);
		}
		await res.status(400).send({ success: false, message: USER_LOGIN_FAILED });
	}
};

const ProfileUpdate = async (req, res) => {
	const {
		UserId,
		FirstName,
		LastName,
		Username,
		Email,
		DisplayName,
		Password,
		ProfilePicUrl,
		UpdatedBy,
		UpdatedOn,
	} = req.body;
	try {
		if (!UserId) {
			res.status(400).json({
				success: false,
				message: PLEASE_PROVIDE_USER_ID,
			});
		} else {
			const result = await User.findByIdAndUpdate(
				UserId,
				{
					FirstName,
					LastName,
					Username,
					Email,
					DisplayName,
					Password,
					ProfilePicUrl,
					UpdatedBy,
					UpdatedOn,
				},
				{
					new: true,
				}
			);
			if (!result) {
				return res.status(500).json({
					success: false,
					message: USER_UPDATED_FAILED,
				});
			}
			res.status(200).json({ success: true, result, message: USER_UPDATED });
		}
	} catch (e) {
		if (NODE_ENV === PRODUCTION) {
			await Logger(`${USER_UPDATED} ` + e);
		} else if (NODE_ENV === DEVELOPMENT) {
			console.log(e);
		}
		await res
			.status(400)
			.send({ success: false, message: USER_UPDATED_FAILED });
	}
};

const PasswordUpdate = async (req, res) => {
	const { UserId, Password, UpdatedBy, UpdatedOn } = req.body;
	try {
		if (!UserId) {
			res.status(400).json({
				success: false,
				message: PLEASE_PROVIDE_USER_ID,
			});
		} else {
			const result = await User.findByIdAndUpdate(
				UserId,
				{
					Password: bcrypt.hashSync(Password, salt),
					UpdatedBy,
					UpdatedOn,
				},
				{
					new: true,
				}
			);
			if (!result) {
				return res.status(500).json({
					success: false,
					message: PASSWORD_UPDATED_FAILED,
				});
			}
			res
				.status(200)
				.json({ success: true, result, message: PASSWORD_UPDATED });
		}
	} catch (e) {
		if (NODE_ENV === PRODUCTION) {
			await Logger(`${PASSWORD_UPDATED} ` + e);
		} else if (NODE_ENV === DEVELOPMENT) {
			console.log(e);
		}
		await res
			.status(400)
			.send({ success: false, message: PASSWORD_UPDATED_FAILED });
	}
};

const UserCount = async (req, res) => {
	try {
		const result = await User.find();
		if (result) {
			res.status(200).json({
				success: true,
				totalUsers: result.length,
				totalUsers1: result,
			});
		} else {
			res.status(404).json({
				success: false,
				message: NO_USER_NOT_FOUND,
			});
		}
	} catch (e) {
		if (NODE_ENV === PRODUCTION) {
			await Logger(`${USER_COUNT} ` + e);
		} else if (NODE_ENV === DEVELOPMENT) {
			console.log(e);
		}
		await res.status(400).send({ success: false, message: USER_COUNT_FOUND });
	}
};

const DeleteUser = async (req, res) => {
	const { UserId } = req.body;
	try {
		if (!UserId) {
			res.status(400).json({
				success: false,
				message: PLEASE_PROVIDE_USER_ID,
			});
		} else {
			User.findByIdAndRemove(UserId).then((user) => {
				if (!user) {
					res.status(500).json({
						success: false,
						message: USER_CANNOT_BE_DELETED,
					});
				} else {
					res.status(200).json({
						success: true,
						message: USER_DELETED,
					});
				}
			});
		}
	} catch (e) {
		if (NODE_ENV === PRODUCTION) {
			await Logger(`${USER_DELETED} ` + e);
		} else if (NODE_ENV === DEVELOPMENT) {
			console.log(e);
		}
		await res
			.status(400)
			.send({ success: false, message: USER_DELETED_FAILED });
	}
};

module.exports = {
	Register,
	Login,
	ProfileUpdate,
	PasswordUpdate,
	UserCount,
	DeleteUser,
};
