const express = require("express");
const router = express.Router();
const assignmentRoutes = require("./routes/assignment.routes")
const userRoutes = require("./routes/user.routes")

router.use("/assignments", assignmentRoutes);
router.use("/users", userRoutes);

module.exports = router;
