const express = require("express");
const router = express.Router();
const assignmentRoutes = require("./routes/assignment.routes")
const authRoutes = require("./routes/auth.routes")
const middlewares = require("./middlewares/middlewares")

router.use(middlewares.authJwt.verifyToken);
router.use("/assignments", assignmentRoutes);

module.exports = router;
