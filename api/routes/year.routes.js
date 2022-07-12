const express = require("express");
const router = express.Router();
const controller = require("../controllers/year.controller");

// GET all assignments
router.get("/", controller.getAllYears);

// GET one assignment
router.get("/:id", controller.getSingleYear);

// POST create single assignment
router.post("/", controller.createYear);

// PATCH update assignment
router.patch("/:id", controller.updateYear);

// DELETE assignment
router.delete("/:id", controller.deleteYear);

module.exports = router;
