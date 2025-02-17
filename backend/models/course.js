const mongoose = require('mongoose');

// Define Course schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  subject: { type: String, required: true },
  location: { type: String, required: true },
  participants: { type: [String], default: [] },
  notes: { type: String, default: '' },
  price: { type: Number, required: true },
  trainerPrice: { type: Number, required: true },
  trainerId: { type: String, default: '' }, // Added trainerId with a default value of ''
});

// Create and export the Course model
module.exports = mongoose.model('Course', courseSchema);
 
