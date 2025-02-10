const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Registers a new user
const register = async (req, res) => {
  const user = await User.create({ ...req.body }); // Create user in DB
  const token = user.createJWT(); // Generate JWT
  // Send response with status, user name and token
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// Logs in a user
const login = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Compare provided password with hashed password in DB
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT(); // Generate JWT
  // Send response with status, user name and token
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login
};
