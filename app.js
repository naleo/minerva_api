//require statements
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

//allow for .env file usage
require("dotenv").config();

const db = process.env.MONGO_URI || "mongodb://localhost:27017/dev";
const port = process.env.PORT || 4000;

mongoose.connect(db).then(() => {
  const app = express();
  app.listen(port, () => {
    console.log("Server has started!");
  });
});