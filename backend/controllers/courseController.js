const Course = require('../models/Course'); 
 
const { isConflict } = require('../utils/conflictChecker');

const mongoose = require('mongoose');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    // Transform the data to include the string version of `_id`
    const transformedCourses = courses.map(course => ({
      ...course._doc, // Spread the course document
      id: course._id.toString(), // Add an `id` field as a string
    }));

    res.json(transformedCourses); // Send the transformed courses
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



// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid course ID.' });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true, 
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





// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid course ID.' });
  }

  try {
    // Find and delete the course
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Course deleted successfully.' });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: 'Failed to delete course.' });
  }
};




module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
