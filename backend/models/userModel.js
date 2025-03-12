//import Mongoose lib
const mongoose = require("mongoose");
//define schema user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim : true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },

  password: { type: String, required: true, minlength: 6 },

  age: {
    type: Number,
  },

  profilePic: {
    type: String,
    default: ''
  }
});

//create a user model using the defined schema
const User = mongoose.model("User", userSchema);

//export the user model to be used in other parts of application
module.exports = User;
