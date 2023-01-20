const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide your full name"],
    },
    email: {
      type: String,
      required: [true, "Provide your email"],
    },
    content: {
      type: String,
      required: [true, "Provide your message context"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
