const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6
  }
});

// Mongoose middleware:  Before saving the user, hash the password
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password with the salt
});

// Instance method to create a JWT token for the user
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  );
};

// Instance method to compare a provided password with the hashed password in the DB
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
