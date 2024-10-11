const express = require("express");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/pages"));

app.get("/", (_, res) => {
  res.render("index", {
    title: "welcome page",
    routes: [
      { name: "Home", path: "/" },
      { name: "Sign Up", path: "/sign-up" },
      { name: "Sign In", path: "/sign-in" },
      { name: "Forgot Password", path: "/forgot-password" },
      { name: "Verify OTP", path: "/verify-otp" },
      { name: "Reset Password", path: "/reset-password" },
    ],
  });
});
app.use("/", viewRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
