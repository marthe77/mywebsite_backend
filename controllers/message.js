const Message = require("../models/Message");
const ErrorResponse = require("../utils/errorResponse");

exports.sendMessage = async (req, res, next) => {
  const { fullname, email, content } = req.body;
  if (fullname == "" || email == "" || content == "") {
    return next(
      new ErrorResponse("Please enter the names email and content", 400)
    );
  }

  const message = await Message.create({ fullname, email, content });
  res.status(201).json({ msg: "message sent to the admin" });
};

exports.readMessage = async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    msg: "retrived messages",
    count: messages.length,
    messages,
  });
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    try {
      await message.delete();
      res.status(200).json("messae has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOneMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};
