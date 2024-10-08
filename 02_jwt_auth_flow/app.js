const express = require("express");
const authRoutes = require("./routes/authRoutes");
const viewRoutes = require("./routes/viewRoutes");
const path = require("path");
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/pages"));


// Routes
app.use("/", viewRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;
