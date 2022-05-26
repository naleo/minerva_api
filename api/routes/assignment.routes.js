const express = require("express");
const Assignment = require("../models/assignment"); //Capitalized because class name
const router = express.Router();
const controller = require("../controllers/assignment.controller");

// GET all assignments
router.get("/", controller.getAllAssignments);

// GET one assignment
router.get("/:id", controller.getSingleAssignment);

// POST create single assignment
router.post("/", controller.createAssignment);

// PATCH update assignment
router.patch("/:id", controller.updateAssignment);

// DELETE assignment
router.delete("/:id", controller.deleteAssignment);

module.exports = router;
