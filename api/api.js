//require statements
const express = require("express");
const cookieSession = require("cookie-session");
const config = require("./config");

const routes = require("./api.routes");

//allow for .env file usage

const port = process.env.PORT || 4000;


const app = express();

app.use(
    cookieSession({
        name: "minerva-session",
        secret: config.secrets.jwt,
        sameSite: true
    })
);

app.use(express.json());
app.use("/api", routes);
app.listen(port, () => {
    console.log("Server has started!");
});

module.exports = app;
