const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

// match entered password to the one hashed in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
