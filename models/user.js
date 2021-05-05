const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
});

userSchema.plugin(uniqueValidator);
const user = mongoose.model("User", userSchema);

module.exports = user;
