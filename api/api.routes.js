const express = require("express");
const router = express.Router();
const assignmentRoutes = require("./routes/assignment.routes")

router.use("/assignments", assignmentRoutes);

module.exports = router;
