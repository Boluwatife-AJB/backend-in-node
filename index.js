const express = require("express");

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello World From Express");
});

app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});
