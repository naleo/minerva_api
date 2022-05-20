const express = require("express");
const course = require("./models/course");
const Course = require("./models/course"); //Capitalized because class name
const router = express.Router();

// GET all courses
router.get("/courses", async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

router.get("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        res.send(course);
    } catch {
        res.status(404);
        res.send({ error: "Course does not exist!" });
    }
});


module.exports = router;
