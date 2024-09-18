const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
