const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyResetToken } = require("../middleware/authMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @route POST /auth/signin
 * @desc Sign in user
 * @access Public
 * @type {Object}
 * @property {string} email.required - email
 * @property {string} password.required - password
 * @returns {Object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @group Auth - Operations about authentication
 * @produces application/json
 * @consumes application/json
 * @tags Auth
 * @security JWT
 */
router.post("/signin", authController.signin);
/**
 * @route POST /auth/signup
 * @desc Sign up user
 * @access Public
 * @type {Object}
 * @property {string} email.required - email
 * @property {string} password.required - password
 * @property {string} first_name.required - name
 * @property {string} last_name.required - name
 * @returns {Object} 201 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @group Auth - Operations about authentication
 * @produces application/json
 * @consumes application/json
 * @tags Auth
 */
router.post("/signup", authController.signup);


/**
 * @route POST /auth/forgot-password
 * @desc Forgot password
 * @access Public
 * @type {Object}
 * @property {string} email.required - email
 * @returns {Object} 200 - A successful message
 * @returns {Error}  default - Unexpected error
 * @group Auth - Operations about authentication
 * @produces application/json
 * @consumes application/json
 * @tags Auth
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @route POST /auth/resend-otp
 * @desc Resend OTP
 * @access Public
 * @type {Object}
 * @property {string} email.required - email
 * @returns {Object} 200 - A successful message
 * @returns {Error}  default - Unexpected error
 * @group Auth - Operations about authentication
 * @produces application/json
 * @tags Auth
 */
router.post("/resend-otp", verifyResetToken, authController.resendOTP);


/**
 * @route POST /auth/reset-password
 * @desc Reset password
 * @type {Object}
 * @access Public
 * @property {string} password.required - password
 * @returns {Object} 200 - A successful message
 * @returns {Error}  default - Unexpected error
 * @group Auth - Operations about authentication
 * @consumes application/json
 * @produces application/json
 * @tags Auth
 */
router.post("/reset-password", verifyResetToken, authController.resetPassword);





module.exports = router;
