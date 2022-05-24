//Requirements
const mongoose = require("mongoose");

var assignmentSchema = new mongoose.Schema({
    schemaVersion: { type: Number, default: 1 },
    studentId: mongoose.Schema.Types.ObjectID,
    courseId: mongoose.Schema.Types.ObjectID,
    dateGiven: Date,
    dateDue: Date,
    isComplete: Boolean,
    dateComplete: Date,
    pointsPossible: Number,
    pointsEarned: Number,
    description: String,
});

//Export to create model
module.exports = mongoose.model("Assignment", assignmentSchema);
