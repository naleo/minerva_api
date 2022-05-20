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

router.post("/courses", async (req, res) => {
    const course = new Course({
        studentId: req.body.studentId,
        courseId: req.body.courseId,
        dateGiven: req.body.dateGiven,
        dateDue: req.body.dateDue,
        isComplete: req.body.isComplete,
        dateComplete: req.body.dateComplete,
        pointsPossible: req.body.pointsPossible,
        pointsEarned: req.body.pointsEarned,
        description: req.body.description,
    });
    await course.save();
    res.send(course);
});

router.patch("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        
        if (req.body.studentId) {
            course.studentId = req.body.studentId;
        }

        if (req.body.courseId) {
            course.courseId = req.body.courseId;
        }
        
        if (req.body.dateGiven) {
            course.dateGiven = req.body.dateGiven;
        }

        if (req.body.dateDue) {
            course.dateDue = req.body.dateDue;
        }
        
        if (req.body.isComplete) {
            course.isComplete = req.body.isComplete;
        }

        if (req.body.dateComplete) {
            course.dateComplete = req.body.dateComplete;
        }

        if (req.body.pointsPossible) {
            course.pointsPossible = req.body.pointsPossible;
        }

        if (req.body.pointsEarned) {
            course.pointsEarned = req.body.pointsEarned;
        }

        if (req.body.description) {
            course.description = req.body.description;
        }
        await course.save();
        res.send(course);
    } catch {
        res.status(404);
        res.send({ error: "Course does not exist!" });
    }
});

module.exports = router;
