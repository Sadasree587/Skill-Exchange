const User = require("../models/User");


// FETCH ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// SEARCH USERS BY SKILL
const searchUsersBySkill = async (req, res) => {

  try {

    const skill = req.query.skill;

    if (!skill) {
      return res.status(400).json({
        message: "Skill query is required",
      });
    }

    const users = await User.find({
      skillsOffered: {
        $regex: skill,
        $options: "i",
      },
    }).select("-password");

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  getAllUsers,
  searchUsersBySkill,
};