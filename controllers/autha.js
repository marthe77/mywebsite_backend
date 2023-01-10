const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
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

module.exports.login_post = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)

        .then((passwordCheck) => {
          // check if password match
          if (!passwordCheck) {
            return res.status(400).send({
              message: "password don't match",
              error,
            });
          }

          // create token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          // return response
          res.status(200).send({
            message: "Login successfully!!",
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Password not match!",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(404).send({
        message: "User not found",
        error,
      });
    });
};
