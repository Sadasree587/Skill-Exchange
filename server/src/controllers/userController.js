const User = require("../models/User");


// GET USER PROFILE
const getUserProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// UPDATE USER PROFILE
const updateUserProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    user.bio = req.body.bio || user.bio;

    user.location = req.body.location || user.location;

    user.skillsOffered =
      req.body.skillsOffered || user.skillsOffered;

    user.skillsWanted =
      req.body.skillsWanted || user.skillsWanted;

    user.profilePic =
      req.body.profilePic || user.profilePic;

    const updatedUser = await user.save();

    const userResponse = {
     id: updatedUser._id,
     name: updatedUser.name,
     email: updatedUser.email,
     bio: updatedUser.bio,
     location: updatedUser.location,
     skillsOffered: updatedUser.skillsOffered,
     skillsWanted: updatedUser.skillsWanted,
     profilePic: updatedUser.profilePic,
    };

    res.status(200).json({
      message: "Profile updated successfully",
      user: userResponse,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  getUserProfile,
  updateUserProfile,
};