const User = require("../models/User");

const SwapRequest = require("../models/SwapRequest");

const Message = require("../models/Message");

const getAllUsers = async (req, res) => {

    try {

      const users = await User.find()
          .select("-password")
          .sort({ createdAt: -1, });

      res.status(200).json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

};

const deleteUser = async (req, res) => {

    try {

      const user = await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
            message:"User not found",
          });

      }

      if (user.role === "admin") {

        return res.status(403).json({
          message:
           "Cannot delete admin account",
        });

      }

      await user.deleteOne();

      res.status(200).json({
        message: "User deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

const getStats = async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalRequests =
        await SwapRequest.countDocuments();

      const totalMessages =
        await Message.countDocuments();

      res.status(200).json({
        totalUsers,
        totalRequests,
        totalMessages,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };

const getAllRequests = async (req, res) => {

  try {

    const requests = await SwapRequest.find()

        .populate(
          "sender",
          "name email"
        )

        .populate(
          "receiver",
          "name email"
        );

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const deleteRequest = async (req, res) => {

  try {

    const request = await SwapRequest.findById(
        req.params.id
      );

    if (!request) {

      return res.status(404).json({
        message: "Request not found",
      });

    }

    await request.deleteOne();

    res.status(200).json({
      message: "Request deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {

getAllUsers,
deleteUser,
getAllRequests,
deleteRequest,
getStats,
};