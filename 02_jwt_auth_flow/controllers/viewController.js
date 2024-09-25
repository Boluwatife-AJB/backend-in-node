exports.getSignUpForm = (req, res) => {
  res.status(200).render("sign-up", {
    title: "Sign Up",
  });
};

exports.getSignInForm = (req, res) => {
  res.status(200).render("sign-in", {
    title: "Sign In",
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render("forgot-password", {
    title: "Forgot Password",
  });
};
