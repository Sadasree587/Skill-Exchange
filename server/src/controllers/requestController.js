const SwapRequest = require("../models/SwapRequest");


// SEND SWAP REQUEST
const sendSwapRequest = async (req, res) => {

  try {

    const {
      receiverId,
      offeredSkill,
      wantedSkill,
    } = req.body;

    // Check empty fields
    if (
      !receiverId ||
      !offeredSkill ||
      !wantedSkill
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Create request
    const request = await SwapRequest.create({
      sender: req.user._id,
      receiver: receiverId,
      offeredSkill,
      wantedSkill,
    });

    res.status(201).json({
      message: "Swap request sent successfully",
      request,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET SENT REQUESTS
const getSentRequests = async (req, res) => {

  try {

    const requests = await SwapRequest.find({
      sender: req.user._id,
    })
      .populate("receiver", "name email");

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET RECEIVED REQUESTS
const getReceivedRequests = async (req, res) => {

  try {

    const requests = await SwapRequest.find({
      receiver: req.user._id,
    })
      .populate("sender", "name email");

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// UPDATE REQUEST STATUS
const updateRequestStatus = async (req, res) => {

  try {

    const { status } = req.body;

    // Validate status
    if (
      status !== "accepted" &&
      status !== "rejected"
    ) {
      return res.status(400).json({
        message:
          "Status must be accepted or rejected",
      });
    }

    // Find request
    const request = await SwapRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Only receiver can update
    if (
      request.receiver.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message:
          "Not authorized to update this request",
      });
    }

    // Update status
    request.status = status;

    await request.save();

    res.status(200).json({
      message: `Request ${status} successfully`,
      request,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  sendSwapRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequestStatus,
};