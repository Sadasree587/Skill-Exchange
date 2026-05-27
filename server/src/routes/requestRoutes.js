const express = require("express");

const {
  sendSwapRequest,
  getSentRequests,
  getReceivedRequests,
} = require("../controllers/requestController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", protect, sendSwapRequest);

router.get("/sent", protect, getSentRequests);

router.get("/received", protect, getReceivedRequests);

module.exports = router;