const Message = require("../models/Message");

// SEND MESSAGE (REST fallback)
const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    if (!receiver || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CHAT BETWEEN TWO USERS
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
       {
         sender: req.user._id,
         receiver: userId,
       },
       {
         sender: userId,
         receiver: req.user._id,
       },
     ],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };