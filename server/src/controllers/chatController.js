const Message = require("../models/Message");
const sendMessage = async (req, res) => {
    const { receiverId, message } = req.body;
    if (!receiverId || !message) {
       return res.status(400).json({
         message: "All fields are required",
       });
    }
    const newMessage = await Message.create({
  sender: req.user._id,
  receiver: receiverId,
  message,
});
res.status(201).json({
  message: "Message sent successfully",
  newMessage,
});
try {

} catch(error) {

}
const getConversation = async (req, res) => {
    const otherUserId = req.params.userId;
    const messages = await Message.find({
  $or: [
    {
      sender: req.user._id,
      receiver: otherUserId,
    },
    {
      sender: otherUserId,
      receiver: req.user._id,
    },
  ],
})
.sort({ createdAt: 1 });
res.status(200).json(messages);

module.exports = {
  sendMessage,
  getConversation,
};