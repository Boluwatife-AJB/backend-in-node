import { signIn } from "./sign-in";

// DOM ELEMENTS
const signInForm = document.getElementById("form-sign-in");

// DELEGATION
if (signInForm) {
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    signIn(email, password);
  });
}
