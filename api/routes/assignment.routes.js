const express = require("express");
const Assignment = require("../models/assignment"); //Capitalized because class name
const router = express.Router();

// GET all assignments
router.get("/", async (req, res) => {
    const assignments = await Assignment.find();
    res.send(assignments);
});

// GET one assignment
router.get("/:id", async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.id });
        res.send(assignment);
    } catch {
        res.status(404);
        res.send({ error: "Assignment does not exist!" });
    }
});

// POST create one assignment
router.post("/", async (req, res) => {
    const assignment = new Assignment({
        studentId: req.body.studentId,
        assignmentId: req.body.assignmentId,
        dateGiven: req.body.dateGiven,
        dateDue: req.body.dateDue,
        isComplete: req.body.isComplete,
        dateComplete: req.body.dateComplete,
        pointsPossible: req.body.pointsPossible,
        pointsEarned: req.body.pointsEarned,
        description: req.body.description,
    });
    await assignment.save();
    res.status(201);
    res.send(assignment);
});


// PATCH update assignment
router.patch("/:id", async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.id });
        
        if (req.body.studentId) {
            assignment.studentId = req.body.studentId;
        }

        if (req.body.assignmentId) {
            assignment.assignmentId = req.body.assignmentId;
        }
        
        if (req.body.dateGiven) {
            assignment.dateGiven = req.body.dateGiven;
        }

        if (req.body.dateDue) {
            assignment.dateDue = req.body.dateDue;
        }
        
        if (req.body.isComplete) {
            assignment.isComplete = req.body.isComplete;
        }

        if (req.body.dateComplete) {
            assignment.dateComplete = req.body.dateComplete;
        }

        if (req.body.pointsPossible) {
            assignment.pointsPossible = req.body.pointsPossible;
        }

        if (req.body.pointsEarned) {
            assignment.pointsEarned = req.body.pointsEarned;
        }

        if (req.body.description) {
            assignment.description = req.body.description;
        }
        await assignment.save();
        res.send(assignment);
    } catch {
        res.status(404);
        res.send({ error: "Assignment does not exist!" });
    }
});

// DELETE assignment
router.delete("/:id", async (req, res) => {
    try {
        await Assignment.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Assignment does not exist!" });
    }
})

module.exports = router;
