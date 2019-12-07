/**
 * @file File that defines user model and schema for the database
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  type: String,
  username: String,
  email: String,
  password: String,
  createdAt: String
});

module.exports = model('User', userSchema);
