const User = require("../models/User");

const getSmartMatches = async (
  req,
  res
) => {

  try {

    const currentUser =
      await User.findById(
        req.user._id
      );

    const users =
      await User.find({
        _id: {
          $ne: req.user._id,
        },
      });

    const matches =
      users.map((user) => {

      const wantedMatches =
  currentUser.skillsWanted.filter(
    (skill) =>
      user.skillsOffered.includes(
        skill
      )
  ).length;

const offeredMatches =
  currentUser.skillsOffered.filter(
    (skill) =>
      user.skillsWanted.includes(
        skill
      )
  ).length;

const totalPossible =

  currentUser.skillsWanted.length +

  currentUser.skillsOffered.length;

const totalMatched =

  wantedMatches +

  offeredMatches;

const score =

  totalPossible === 0

    ? 0

    : Math.round(

        (
          totalMatched /

          totalPossible

        ) * 100

      );

        return {

          ...user.toObject(),

          matchScore: score,

        };

      });

    matches.sort(
      (a, b) =>
        b.matchScore -
        a.matchScore
    );

    res.json(matches);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

module.exports = {
  getSmartMatches,
};