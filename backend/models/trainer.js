const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  trainerName: { type: String, required: true },
  trainerSubjects: { type: [String], required: true },
  trainerLocation: { type: String, required: true },
  trainerEmail: { type: String, required: true, unique: true },
  assignedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});


module.exports = mongoose.model("Trainer", trainerSchema);
