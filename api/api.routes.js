const express = require("express");
const router = express.Router();
const assignmentRoutes = require("./routes/assignment.routes")
const authRoutes = require("./routes/auth.routes")

router.use("/assignments", assignmentRoutes);

module.exports = router;
