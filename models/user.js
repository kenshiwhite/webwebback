const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: null },
  deletionDate: { type: Date, default: null },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;