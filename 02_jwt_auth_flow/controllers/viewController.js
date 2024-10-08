exports.getSignUpPage = (_, res) => {
  res.render("index", {
    title: "Home page",
  });
};

exports.getSignUpPage = (_, res) => {
  res.render("sign-up", {
    title: "Sign Up",
  });
};

exports.getSignInPage = (_, res) => {
  res.render("sign-in", {
    title: "Sign In",
  });
};

exports.getForgotPasswordPage = (_, res) => {
  res.render("forgot-password", {
    title: "Forgot Password",
  });
};

exports.getVerifyOTPPage = (_, res) => {
  res.render("verify-otp", {
    title: "Verify OTP",
  });
};

exports.getResetPasswordPage = (_, res) => {
  res.render("reset-password", {
    title: "Reset Password",
  });
};
