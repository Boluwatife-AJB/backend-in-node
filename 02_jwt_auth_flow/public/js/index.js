import { signIn, signUp, forgotPassword, verifyOtp, resetPassword } from "./auth.js";

// DOM ELEMENTS
const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const forgotPasswordForm = document.getElementById("forgot-password-form")
const verifyOtpForm = document.getElementById("verify-otp-form")
const resetPasswordForm = document.getElementById("reset-password-form")
const togglePassword = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");
const toggleNewPassword = document.getElementById("toggle-new-password");
const newPasswordInput = document.getElementById("newPassword");
const toggleConfirmPassword = document.getElementById(
  "toggle-confirm-password"
);
const confirmPasswordInput = document.getElementById("confirmPassword");

if (toggleNewPassword && newPasswordInput) {
  toggleNewPassword.addEventListener("click", () => {
    // Toggle the type attribute for new password
    const type =
      newPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    newPasswordInput.setAttribute("type", type);

    // Change the text of the button
    toggleNewPassword.textContent = type === "password" ? "Show" : "Hide";
  });
}

if (toggleConfirmPassword && confirmPasswordInput) {
  toggleConfirmPassword.addEventListener("click", () => {
    // Toggle the type attribute for confirm password
    const type =
      confirmPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    confirmPasswordInput.setAttribute("type", type);

    // Change the text of the button
    toggleConfirmPassword.textContent = type === "password" ? "Show" : "Hide";
  });
}


if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    // Toggle the type attribute
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the text of the button
    togglePassword.textContent = type === "password" ? "Show" : "Hide";
  });
}


// DELEGATION
if (signInForm) {
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signIn(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
   
    signUp(firstName, lastName, email, password)
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    forgotPassword(email);
  });   
}

if (verifyOtpForm) {
  const otpInputs = document.querySelectorAll('input[inputmode="numeric"]');
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Resend OTP
  const resendOTPButton = document.getElementById("reset-otp-button")

  // resendOTPButton.addEventListener("click", () => {

  // })

  verifyOtpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const otp = Array.from(otpInputs).map((input) => input.value).join("");
    const resetToken = localStorage.getItem("resetPasswordToken");
    verifyOtp(otp,resetToken)
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const resetToken = localStorage.getItem("resetPasswordToken")
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    resetPassword(newPassword, confirmPassword, resetToken);
  });
}