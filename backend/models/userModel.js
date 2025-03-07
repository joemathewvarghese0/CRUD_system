//import Mongoose lib
const mongoose = require("mongoose");
//define schema user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: { type: String, required: true },

  age: {
    type: Number,
  },
});

//create a user model using the defined schema
const User = mongoose.model("User", userSchema);

//export the user model to be used in other parts of application
module.exports = User;
