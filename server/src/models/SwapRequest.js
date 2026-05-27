const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    offeredSkill: {
      type: String,
      required: true,
    },

    wantedSkill: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SwapRequest",
  swapRequestSchema
);