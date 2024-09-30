import { showAlert } from "./alerts.js";

export const signIn = async (email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      showAlert("success", "Logged in successfully");
      console.log(data.data);
      const apiResponse = data.data;
      const user_token = apiResponse.token;

      localStorage.setItem("userToken", user_token);

      return data;
    } else {
      throw new Error("Sign in failed");
    }
  } catch (error) {
    showAlert("error", "sign in failed!");
    console.error(error);
  }
};
