exports.getSignUpPage = (req, res) => {
  res.status(200).render("sign-up", {
    title: "Sign Up",
  });
};

exports.getSignInPage = (req, res) => {
  res.status(200).render("sign-in", {
    title: "Sign In",
  });
};

exports.getForgotPasswordPage = (req, res) => {
  res.status(200).render("forgot-password", {
    title: "Forgot Password",
  });
};


exports.getVerifyOTPPage = (req, res) => {
  res.status(200).render("verify-otp", {
    title: "Verify OTP",
  });
}


exports.getResetPasswordPage = (req, res) => {
  res.status(200).render("reset-password", {
    title:  "Reset Password"
  })
}