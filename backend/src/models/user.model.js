const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  pseudo: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true }
  },
 
);

const User = mongoose.model('User', userSchema);

module.exports = User;
