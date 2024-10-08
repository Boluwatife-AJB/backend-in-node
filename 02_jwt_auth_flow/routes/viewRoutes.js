const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/sign-up", viewController.getSignUpPage);
router.get("/sign-in", viewController.getSignInPage);
router.get("/forgot-password", viewController.getForgotPasswordPage);
router.get("/verify-otp", viewController.getVerifyOTPPage);
router.get("/reset-password", viewController.getResetPasswordPage);

module.exports = router;
