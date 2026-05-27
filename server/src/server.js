const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});