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
// import middleware
const cors = require("cors");
const morgan = require("morgan");

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

// MODELS //
const UnitSchema = new mongoose.Schema({
  name: String,
  image: String,
  personal: String,
  crest: String,
  baseStats: {
    hp: Number,
    str: Number,
    mag: Number,
    dex: Number,
    spd: Number,
    lck: Number,
    def: Number,
    res: Number,
    cha: Number,
  },
  maxStats: {
    hp: Number,
    str: Number,
    mag: Number,
    dex: Number,
    spd: Number,
    lck: Number,
    def: Number,
    res: Number,
    cha: Number,
  },
  growthRates: {
    hp: Number,
    str: Number,
    mag: Number,
    dex: Number,
    spd: Number,
    lck: Number,
    def: Number,
    res: Number,
    cha: Number,
  }
});

const Unit = mongoose.model("Unit", UnitSchema);

// MIDDLEWARE //
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

// ROUTES //
// Test Route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Index
app.get("/units", async (req, res) => {
  try {
      // send all people
      res.json(await Unit.find({}));
  } catch (error) {
      //send error
      res.status(400).json(error);
  }
});

// Create
app.post("/units", async (req, res) => {
  try {
      // send all units
      res.json(await Unit.create(req.body));
  } catch (error) {
      //send error
      res.status(400).json(error);
  }
});

// LISTENER //
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));