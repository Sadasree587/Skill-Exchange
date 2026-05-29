const express = require("express");

const {
  sendMessage,
  getConversation,
} = require("../controllers/chatController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", protect, sendMessage);

router.get("/:userId", protect, getConversation);

module.exports = router;

const chatRoutes = require("./routes/chatRoutes");

app.use("/api/chat", chatRoutes);