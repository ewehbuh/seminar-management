const Course = require('../models/Course'); // Import Course model
const { isConflict, findBestTrainer } = require('../utils/conflictChecker');
const { sendEmail } = require('../utils/emailService');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err); // Log error
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  const { name, date, subject, location, participants, notes, price, trainerPrice } = req.body;

  try {
    const courses = await Course.find();
    const newCourse = new Course({ name, date, subject, location, participants, notes, price, trainerPrice });

    if (isConflict(courses, newCourse)) {
      return res.status(400).json({ error: 'Scheduling conflict detected.' });
    }

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Error creating course:", err); // Log error
    res.status(500).json({ error: 'Failed to create course' });
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

    if (trainer.assignedCourses.some((course) => course.date === course.date)) {
      return res.status(400).json({
        error: 'Trainer is already assigned to another course on this date.',
      });
    }

    trainer.assignedCourses.push(course);
    await trainer.save();

    sendEmail(
      trainer.email,
      'New Course Assignment',
      `You have been assigned to the course: ${course.name} on ${course.date}.`
    );

    res.json({ message: 'Trainer assigned successfully.' });
  } catch (err) {
    console.error("Error assigning trainer:", err); // Log error
    res.status(500).json({ error: 'Failed to assign trainer.' });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error); // Log error
    res.status(500).json({ error: 'Failed to update course.' });
  }
};

module.exports = { getCourses, createCourse, assignTrainer, updateCourse };
