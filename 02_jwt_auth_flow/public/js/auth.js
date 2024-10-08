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

    console.log(response)

    if (response.ok) {
      const data = await response.json();
      showAlert("success", "Logged in successfully");
      const apiResponse = data.data;
      const user_token = apiResponse.token;

      localStorage.setItem("userToken", user_token);

      return data;
    } else {
      const data = await response.json();
      // console.error(data)
      showAlert("error", data.message || "Invalid email or password");
    }
  } catch (error) {
    console.error("Sign in error:", error);
    showAlert("error", "Unable to connect to the server. Please try again later.");
  }
};


export const signUp = async (first_name, last_name, email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      showAlert("success", "Signed up successfully");
      console.log(data.data);
    } else {
      const data = await response.json();
      console.error(data);
      showAlert("error", data.message || "Sign up failed");
    }
  } catch (error) {
    showAlert("error", "sign up failed!");
    console.error(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8080/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      showAlert("info", "OTP sent to your email");
      // console.log(data);
      const { resetToken } = data 
      localStorage.setItem('resetPasswordToken', resetToken)
      
      window.setTimeout(() => {
        location.assign("/verify-otp");
      }, 2500);
    } else {
      const data = await response.json();
      console.error(data);
      showAlert("error", "Email does not exist, please check your email");
    }
  } catch (error) {
    showAlert("error", "Email does not exist, please check your email");
    console.error(error);
  }
};

export const resendOtp = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/auth/resend-otp", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("resetPasswordToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      showAlert("info", "OTP resent");
      console.log(data.data);
    } else {
      const data = await response.json();
      console.error(data);
      showAlert("error", "Unable to resend otp");
    }
  } catch {
    showAlert("error", "Unable to resend otp");
    console.error(error);
  }
};

export const verifyOtp = async (otp, resetPasswordToken) => {
  try {
    const response = await fetch("http://127.0.0.1:8080/api/auth/verify-otp", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resetPasswordToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({otp}),
    });

    console.log(response)

    if (response.ok) {
      const data = await response.json();
      showAlert("info", "OTP submitted");
      console.log(data.data);
      window.setTimeout(() => {
        location.assign("/reset-password");
      }, 1500);
    } else {
      const data = await response.json();
      console.error(data);
      showAlert("error", "Invalid OTP!");
    }
  } catch (error) {
    showAlert("error", "Invalid OTP!");
    console.error(error);
  }
};

export const resetPassword = async (password, passwordConfirm, resetPasswordToken) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8080/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resetPasswordToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password: password,
          new_password_confirm: passwordConfirm,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      showAlert("success", "Password reset successful!");
      console.log(data.data);
    }
  } catch (error) {
    showAlert("error", "Password does not match, please try again");
    console.error(error);
  }
};