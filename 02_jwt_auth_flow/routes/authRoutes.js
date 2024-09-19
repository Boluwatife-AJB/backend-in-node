const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
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

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

module.exports = router;
