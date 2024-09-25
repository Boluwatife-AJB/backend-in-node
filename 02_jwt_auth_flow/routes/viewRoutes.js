const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/sign-up", viewController.getSignUpForm);
router.get("/sign-in", viewController.getSignInForm);
router.get("/forgot-password", viewController.getForgotPasswordForm);

module.exports = router;
