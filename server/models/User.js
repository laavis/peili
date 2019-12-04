const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  type: String,
  username: String,
  email: String,
  password: String,
  createdAt: String
});

module.exports = model('User', userSchema);
