const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const adminOnly =
  require("../middleware/adminMiddleware");

const {

  getAllUsers,

  deleteUser,

  getAllRequests,

  deleteRequest,

  getStats,

} = require(
  "../controllers/adminController"
);

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

router.get(
  "/requests",
  protect,
  adminOnly,
  getAllRequests
);

router.delete(
  "/requests/:id",
  protect,
  adminOnly,
  deleteRequest
);

router.get(
  "/stats",
  protect,
  adminOnly,
  getStats
);

module.exports =
  router;