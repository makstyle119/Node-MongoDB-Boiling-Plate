const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  DisplayName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PasswordResetToken: {
    type: String,
  },
  PasswordResetExpiration: {
    type: Date,
  },
  ProfilePicUrl: {
    type: String,
  },
  LastIpAddress: {
    type: String,
  },
  IsDeleted: {
    type: Boolean,
    default: false,
  },
  CreatedBy: {
    type: String,
  },
  CreatedOn: {
    type: String,
    default: Date.now(),
  },
  UpdatedBy: {
    type: String,
  },
  UpdatedOn: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.set('toJSON', {
  virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
