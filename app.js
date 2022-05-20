//require statements
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
mongoose.set('debug', true);

//allow for .env file usage
require("dotenv").config();

const db = process.env.MONGO_URI || "mongodb://localhost:27017/dev";
const port = process.env.PORT || 4000;

mongoose.connect(db).then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);
    app.listen(port, () => {
        console.log("Server has started!");
    });
});
