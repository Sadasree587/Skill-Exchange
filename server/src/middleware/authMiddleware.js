const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {

    // Check token exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from token id
       req.user = await User.findById(decoded.id)
        .select("-password");

      console.log("USER:");
      console.log(req.user);
      next();

    } else {

      return res.status(401).json({
        message: "Not authorized, no token",
      });

    }

  } catch (error) {

    return res.status(401).json({
      message: "Token failed",
    });

  }
};

module.exports = protect;