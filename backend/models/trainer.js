const mongoose = require('mongoose');

// Define Trainer schema
const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trainingSubjects: { type: [String], required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  assignedCourses: { type: [mongoose.Schema.Types.ObjectId], ref: 'Course', default: [] },
});

// Create and export the Trainer model
const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer;
