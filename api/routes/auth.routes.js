const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const middlewares = require("../middlewares/middlewares")

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/logout", controller.logout);

module.exports = router;