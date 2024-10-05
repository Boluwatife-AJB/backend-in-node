const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

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

const generateResetPasswordToken = (userId, user_email) => {
  return jwt.sign({ userId, user_email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
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

/**
 * Forgot password - sends OTP to user's email.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
exports.forgotPassword = async (req, res) => {
  try {
    // Get user based on posted email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "There is no user with that email address",
      });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Generate reset token
    const resetToken = generateResetPasswordToken(user.user_uuid, user.email);
    // Save OTP and expiration to user document
    user.password_reset_otp = otp;
    user.password_reset_expires = otpExpires;
    user.password_reset_token = resetToken;
    await user.save({ validateBeforeSave: false });

    // Send OTP to user's email
    await sendEmail({
      to: user.email,
      subject: "Your password reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to email!",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

/**
 * Resends OTP to user's email.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
exports.resendOTP = async (req, res) => {
  try {
    const user = req.user;

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Update user document with new OTP
    user.password_reset_otp = otp;
    user.password_reset_expires = otpExpires;
    await user.save({ validateBeforeSave: false });

    // Send email with new OTP
    await sendEmail({
      to: user.email,
      subject: "Your new password reset OTP",
      text: `Your new OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "New OTP sent to email!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not resend OTP. Please try again.",
      error: error.message,
    });
  }
};

/**
 * Verify user's OTP code
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = req.user;

    console.log(user)

    if (
      user.password_reset_otp !== otp ||
      user.password_reset_expires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Incorrect OTP, try again!",
      error: error.message,
    });
  }
};

/**
 * Resets user's password.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
exports.resetPassword = async (req, res) => {
  try {
    const { new_password, new_password_confirm } = req.body;
    const user = req.user;

    if (new_password !== new_password_confirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Set new password
    user.password = new_password;

    user.password_reset_otp = undefined;
    user.password_reset_expires = undefined;
    user.password_reset_token = undefined;
    await user.save();

    // Log the user in, send JWT
    createSendToken(user, 200, res, "Password reset successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not reset password. Please try again.",
      error: error.message,
    });
  }
};
