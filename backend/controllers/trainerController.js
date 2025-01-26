const Trainer = require('../models/Trainer');
const Course = require('../models/Course');
const { getBestAvailableTrainers } = require('../utils/trainerUtils');
const { sendEmail } = require('../utils/emailService');

// Get all trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();

    // Format response for frontend
    const formattedTrainers = trainers.map((trainer) => ({
      id: trainer._id.toString(),
      trainerName: trainer.trainerName,
      trainerSubjects: trainer.trainerSubjects,
      trainerLocation: trainer.trainerLocation,
      trainerEmail: trainer.trainerEmail,
    }));

    res.json(formattedTrainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ error: 'Failed to retrieve trainers.' });
  }
};

// Assign a trainer to a course
const assignTrainer = async (req, res) => {
  const { courseId, trainerId } = req.params;

  try {
    const course = await Course.findById(courseId);
    const trainer = await Trainer.findById(trainerId);

    if (!course || !trainer) {
      return res.status(404).json({ error: 'Course or trainer not found.' });
    }

    const isTrainerAssigned = trainer.assignedCourses.some(
      (assignedCourse) => assignedCourse.toString() === course._id.toString()
    );

    if (isTrainerAssigned) {
      return res.status(400).json({
        error: 'Trainer is already assigned to this course.',
      });
    }

    // Assign the trainer to the course
    course.trainerId = trainerId;
    trainer.assignedCourses.push(course._id);
    await Promise.all([course.save(), trainer.save()]);

    // Send an email notification
    await sendEmail(
      trainer.trainerEmail,
      'New Course Assignment',
      `You have been assigned to the course "${course.name}" on ${course.date}.`,
      `<p>You have been assigned to the course "<strong>${course.name}</strong>" on <strong>${course.date}</strong>.</p>`
    );

    res.json({ message: 'Trainer assigned successfully.' });
  } catch (error) {
    console.error('Error assigning trainer:', error);
    res.status(500).json({ error: 'Failed to assign trainer.' });
  }
};

// Get best trainers for a course
const getBestTrainersForCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const trainers = await getBestAvailableTrainers(courseId);

    const formattedTrainers = trainers.map((trainer) => ({
      id: trainer._id.toString(),
      trainerName: trainer.trainerName,
      trainerSubjects: trainer.trainerSubjects,
      trainerLocation: trainer.trainerLocation,
      trainerEmail: trainer.trainerEmail,
    }));

    res.json(formattedTrainers);
  } catch (error) {
    console.error('Error fetching best trainers:', error);
    res.status(500).json({ error: 'Failed to retrieve best trainers.' });
  }
};
// Get  total number of courses and trainers
const getMetadata = async (req, res) => {
  try {
    const totalTrainers = await Trainer.countDocuments();
    const totalCourses = await Course.countDocuments();

    res.json({
      totalTrainers,
      totalCourses,
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Failed to retrieve metadata.' });
  }
};

// Create a new trainer
const createTrainer = async (req, res) => {
  const { trainerName, trainerSubjects, trainerLocation, trainerEmail } = req.body;

  const missingFields = ['trainerName', 'trainerSubjects', 'trainerLocation', 'trainerEmail'].filter(
    (field) => !req.body[field]
  );

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  try {
    const newTrainer = new Trainer({
      trainerName,
      trainerSubjects,
      trainerLocation,
      trainerEmail,
    });

    await newTrainer.save();

    res.status(201).json({
      id: newTrainer._id.toString(),
      trainerName: newTrainer.trainerName,
      trainerSubjects: newTrainer.trainerSubjects,
      trainerLocation: newTrainer.trainerLocation,
      trainerEmail: newTrainer.trainerEmail,
    });
  } catch (error) {
    console.error('Error creating trainer:', error);
    res.status(500).json({ error: error.code === 11000 ? 'Email already exists.' : 'Failed to create trainer.' });
  }
};

// Update an existing trainer
const updateTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrainer) {
      return res.status(404).json({ error: 'Trainer not found.' });
    }

    res.json({
      id: updatedTrainer._id.toString(),
      trainerName: updatedTrainer.trainerName,
      trainerSubjects: updatedTrainer.trainerSubjects,
      trainerLocation: updatedTrainer.trainerLocation,
      trainerEmail: updatedTrainer.trainerEmail,
    });
  } catch (error) {
    console.error('Error updating trainer:', error);
    res.status(500).json({ error: 'Failed to update trainer.' });
  }
};

// Delete a trainer
const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(id);

    if (!deletedTrainer) {
      return res.status(404).json({ error: 'Trainer not found.' });
    }

    res.json({ message: 'Trainer deleted successfully.' });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    res.status(500).json({ error: 'Failed to delete trainer.' });
  }
};

module.exports = {
  getTrainers,
  assignTrainer,
  getMetadata,
  getBestTrainersForCourse,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
