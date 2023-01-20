const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
//handle errors
const handleErrors = (err) => {
  console.log(err);
  let error = { email: "", password: "" };
  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  if (err.code == "11000") {
    // error = err;
    const msg = err.message;
    const field = err.keyValue;
    error = { msg, field };
  }
  return error;
};

module.exports.signup_post = async (req, res) => {
  const { email, password, username, profilePic } = req.body;
  let hashedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
        profilePic,
      });
      res.status(201).json(user);
    } catch (err) {
      const error = handleErrors(err);
      res.status(400).json({ error });
    }
  }
};

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedToken();
  const userRole = user.role;
  const username = user.username;
  const email = user.email;

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV == "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    username,
    email,
    userRole,
  });
};
