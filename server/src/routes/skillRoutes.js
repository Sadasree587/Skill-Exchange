const express = require("express");

const {
  getAllUsers,
  searchUsersBySkill,
} = require("../controllers/skillController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, getAllUsers);

router.get("/search", protect, searchUsersBySkill);

module.exports = router;