//require statements
const express = require("express");

const routes = require("./api.routes");
const authRoutes = require("./routes/auth.routes")

//allow for .env file usage

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/api", routes);
app.use("/", authRoutes);
app.listen(port, () => {
    console.log("Server has started!");
});

module.exports = app;