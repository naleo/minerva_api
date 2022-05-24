const express = require("express");
const course = require("./models/course");
const Course = require("./models/course"); //Capitalized because class name
const router = express.Router();

router.get("/test", (req, res) => {
    const resObject = {
        message: "Test API working"
    };
    res.send(resObject);
});

// GET all courses
router.get("/courses", async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

// GET one course
router.get("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        res.send(course);
    } catch {
        res.status(404);
        res.send({ error: "Course does not exist!" });
    }
});

// POST create one course
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


// PATCH update course
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

// DELETE course
router.delete("/courses/:id", async (req, res) => {
    try {
        await Course.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Course does not exist!" });
    }
})

module.exports = router;
