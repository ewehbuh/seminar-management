const Trainer = require('../models/Trainer'); // Import the Trainer model

// Get all trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error); // Log error
    res.status(500).json({ error: 'Failed to retrieve trainers' });
  }
};

// Create a new trainer
const createTrainer = async (req, res) => {
  const { name, trainingSubjects, location, email } = req.body;

  try {
    const newTrainer = new Trainer({ name, trainingSubjects, location, email });
    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (error) {
    console.error("Error creating trainer:", error); // Log error
    if (error.code === 11000) {
      // Handle duplicate email error
      res.status(400).json({ error: 'Email already exists.' });
    } else {
      res.status(500).json({ error: 'Failed to create trainer.' });
    }
  }
};

// Update an existing trainer
const updateTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedTrainer) {
      return res.status(404).json({ error: 'Trainer not found.' });
    }

    res.json(updatedTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error); // Log error
    res.status(500).json({ error: 'Failed to update trainer.' });
  }
};

module.exports = { getTrainers, createTrainer, updateTrainer };
