const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  googleId: String,
  // linkedIn: String,
  name: String
});

mongoose.model('users', userSchema);
