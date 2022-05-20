const express = require("express");
const course = require("./models/course");
const Course = require("./models/course"); //Capitalized because class name
const router = express.Router();

// GET all courses
router.get("/courses", async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});


module.exports = router;
