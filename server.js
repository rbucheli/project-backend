// DEPENDENCIES //

// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");

// DATABASE CONNECTION //
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connect Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));
// ROUTES //
// Test Route
app.get("/", (req, res) => {
    res.send("hello world");
});

// LISTENER //
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));