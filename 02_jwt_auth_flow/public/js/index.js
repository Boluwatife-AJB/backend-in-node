import { signIn } from "./auth.js";

// DOM ELEMENTS
const signInForm = document.getElementById("form-sign-in");

// DELEGATION
if (signInForm) {
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signIn(email, password);
  });
}
