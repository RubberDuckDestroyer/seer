const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true
  },
  email: {
    type: string,
    required: true,
    unique: true
  },
  password: {
    type: string,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
