exports.getSignUpPage = (req, res) => {
  res.render("index", {
    title: "Home page",
  });
};

exports.getSignUpPage = (req, res) => {
  res.render("sign-up", {
    title: "Sign Up",
  });
};

exports.getSignInPage = (req, res) => {
  res.render("sign-in", {
    title: "Sign In",
  });
};

exports.getForgotPasswordPage = (req, res) => {
  res.render("forgot-password", {
    title: "Forgot Password",
  });
};

exports.getVerifyOTPPage = (req, res) => {
  res.render("verify-otp", {
    title: "Verify OTP",
  });
};

exports.getResetPasswordPage = (req, res) => {
  res.render("reset-password", {
    title: "Reset Password",
  });
};
