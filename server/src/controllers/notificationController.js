const Notification =
  require("../models/Notification");

const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          receiver: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        notifications
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const markAsRead =
  async (req, res) => {
    try {
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        }
      );

      res.json({
        message:
          "Notification updated",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const markAllRead =
  async (req, res) => {
    try {
      await Notification.updateMany(
        {
          receiver:
            req.user._id,
        },
        {
          isRead: true,
        }
      );

      res.json({
        message:
          "All notifications read",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getNotifications,
  markAsRead,
  markAllRead,
};