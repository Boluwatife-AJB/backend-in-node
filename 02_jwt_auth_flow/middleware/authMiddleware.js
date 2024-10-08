const jwt = require("jsonwebtoken");

/**
 * Middleware to verify the token sent by the user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
module.exports = (req, res, next) => {
  // Get token from the header
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;

    next();
  } catch (error) {
    // Invalid token
    res.status(403).json({ message: "Invalid token" });
  }
};
