const mongoose = require("mongoose");

// table
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// model for the schema
const User = mongoose.model("User", userSchema);
module.exports = User;
