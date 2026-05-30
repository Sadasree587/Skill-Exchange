const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const requestRoutes = require("./routes/requestRoutes");
const messageRoutes = require("./routes/messageRoutes");

// MESSAGE MODEL
const Message = require("./models/Message");

const app = express();

const server = http.createServer(app);

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// DATABASE CONNECTION
connectDB();

// MIDDLEWARES
app.use(cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/requests", requestRoutes);

app.use("/api/messages", messageRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // USER JOINS PERSONAL ROOM
  socket.on("join", (userId) => {

    socket.join(userId);

    console.log(`User joined room: ${userId}`);

  });

  // SEND MESSAGE EVENT
  socket.on("send_message", async (data) => {

    try {

      const {
        senderId,
        receiverId,
        message,
      } = data;

      // SAVE MESSAGE TO DATABASE
      const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        message,
      });

      // EMIT MESSAGE TO RECEIVER
      io.to(receiverId).emit(
        "receive_message",
        newMessage
      );

    } catch (error) {

      console.log(error.message);

    }

  });

  // DISCONNECT EVENT
  socket.on("disconnect", () => {

    console.log(
      "User disconnected:",
      socket.id
    );

  });

});

// SERVER LISTEN
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});