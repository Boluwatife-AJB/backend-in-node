const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Middleware to verify authentication or reset token based on the `tokenType` flag.
 * @param {string} tokenType - Type of token to verify ('auth' or 'reset').
 * @returns {function} Middleware function.
 */
const verifyToken = (tokenType) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: `No ${
            tokenType === "reset" ? "reset" : "auth"
          } token provided.`,
        });
      }

      const token = authHeader.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (tokenType === "reset") {
        // For reset token verification, find user and check if token is valid
        const user = await User.findOne({ user_uuid: decoded.userId });

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired reset token.",
          });
        }

        // Attach user to request object
        req.user = user;
      } else {
        // For authentication token verification
        req.userId = decoded.userId;
      }

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: `Invalid ${tokenType === "reset" ? "reset" : "auth"} token.`,
        error: error.message,
      });
    }
  };
};

// Export two middlewares: one for auth token, one for reset token
module.exports.verifyAuthToken = verifyToken("auth");
module.exports.verifyResetToken = verifyToken("reset");
