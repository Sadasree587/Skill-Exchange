const SwapRequest = require("../models/SwapRequest");
const Notification = require("../models/Notification");

// SEND SWAP REQUEST
const sendSwapRequest = async (req, res) => {

  try {

    const {
      receiverId,
      offeredSkill,
      wantedSkill,
    } = req.body;

    if (
      !receiverId ||
      !offeredSkill ||
      !wantedSkill
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const request =
      await SwapRequest.create({

        sender: req.user._id,

        receiver: receiverId,

        offeredSkill,

        wantedSkill,

      });

    // Notification

    await Notification.create({

      user: receiverId,

      title: "New Swap Request",

      message:
        `${req.user.name} sent you a skill swap request.`,

    });

    res.status(201).json({

      message:
        "Swap request sent successfully",

      request,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET SENT REQUESTS

const getSentRequests = async (
  req,
  res
) => {

  try {

    const requests =
      await SwapRequest.find({

        sender: req.user._id,

      })

        .populate(
          "receiver",
          "name email"
        );

    res.status(200).json(
      requests
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};


// GET RECEIVED REQUESTS

const getReceivedRequests =
  async (
    req,
    res
  ) => {

    try {

      const requests =
        await SwapRequest.find({

          receiver:
            req.user._id,

        })

          .populate(
            "sender",
            "name email"
          );

      res.status(200).json(
        requests
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


// UPDATE REQUEST STATUS

const updateRequestStatus =
  async (
    req,
    res
  ) => {

    try {

      const { status } =
        req.body;

      if (
        status !==
          "accepted" &&
        status !==
          "rejected"
      ) {
        return res
          .status(400)
          .json({

            message:
              "Status must be accepted or rejected",

          });
      }

      const request =
        await SwapRequest.findById(
          req.params.id
        );

      if (!request) {

        return res
          .status(404)
          .json({

            message:
              "Request not found",

          });

      }

      if (
        request.receiver.toString() !==
        req.user._id.toString()
      ) {

        return res
          .status(401)
          .json({

            message:
              "Not authorized to update this request",

          });

      }

      request.status =
        status;

      await request.save();

      // Notification

      await Notification.create({

        user:
          request.sender,

        title:
          "Swap Request Updated",

        message:
          `Your swap request has been ${status}.`,

      });

      res.status(200).json({

        message:
          `Request ${status} successfully`,

        request,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


// DELETE REQUEST

const deleteRequest =
  async (
    req,
    res
  ) => {

    try {

      const request =
        await SwapRequest.findById(
          req.params.id
        );

      if (!request) {

        return res
          .status(404)
          .json({

            message:
              "Request not found",

          });

      }

      if (
        request.sender.toString() !==
        req.user._id.toString()
      ) {

        return res
          .status(401)
          .json({

            message:
              "Not authorized to delete this request",

          });

      }

      // Notification

      await Notification.create({

        user:
          request.receiver,

        title:
          "Swap Request Cancelled",

        message:
          `${req.user.name} cancelled the swap request.`,

      });

      await request.deleteOne();

      res.status(200).json({

        message:
          "Request deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


module.exports = {

  sendSwapRequest,

  getSentRequests,

  getReceivedRequests,

  updateRequestStatus,

  deleteRequest,

};