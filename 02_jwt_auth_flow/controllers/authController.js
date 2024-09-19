const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Generates a JWT token for the user.
 * @param {string} user_uuid - The unique identifier for the user.
 * @param {string} first_name - The first name of the user.
 * @param {string} last_name - The last name of the user.
 * @param {string} email - The email of the user.
 * @returns {string} - The generated JWT token.
 */
const userToken = (user_uuid, first_name, last_name, email) => {
  return jwt.sign(
    { user_uuid, first_name, last_name, email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

/**
 * Creates a JWT token and sends it to the user.
 * @param {object} user - The user object.
 * @param {number} statusCode - The status code of the response.
 * @param {object} res - The response object.
 * @param {string} message - The message to send to the user.
 * @returns {void}
 * @example
 * createSendToken(user, 201, res, "User created successfully");
 * createSendToken(user, 200, res, "User logged in successfully");
 */
const createSendToken = (user, statusCode, res, message) => {
  // Generate JWT token
  const token = userToken(
    user.user_uuid,
    user.first_name,
    user.last_name,
    user.email
  );

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: true,
    message,
    data: {
      user,
      token,
    },
  });
};

/**
 * Signs up a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      first_name,
      last_name,
    });

    // Save new user to the database
    await user.save();

    // Create and send token
    createSendToken(user, 201, res, "User created successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Signs in a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and include password field
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please sign up",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create and send token
    createSendToken(user, 200, res, "User logged in successfully");
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
};
