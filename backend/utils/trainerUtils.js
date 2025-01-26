const Course = require('../models/Course');
const Trainer = require('../models/Trainer');

const getBestAvailableTrainers = async (courseId) => {
  // Fetch the course details for the given courseId
  const course = await Course.findById(courseId);
  if (!course) throw new Error('Course not found');

  const courseDate = new Date(course.date).toISOString().split('T')[0]; // Get the date (YYYY-MM-DD)

  // Fetch all trainers
  const trainers = await Trainer.find();

  // Filter trainers who are not assigned to any course on the same date
  const availableTrainers = await Promise.all(
    trainers.map(async (trainer) => {
      // Find courses assigned to the trainer
      const assignedCourses = await Course.find({ _id: { $in: trainer.assignedCourses } });

      // Check if any assigned course has the same date
      const hasDateConflict = assignedCourses.some((assignedCourse) => {
        const assignedCourseDate = new Date(assignedCourse.date).toISOString().split('T')[0];
        return assignedCourseDate === courseDate;
      });

      return hasDateConflict ? null : trainer; // Exclude trainers with conflicting dates
    })
  );

  // Remove null values from the filtered trainers
  const filteredTrainers = availableTrainers.filter(Boolean);

  // Further filter for trainers with at least one matching subject
  const matchingTrainers = filteredTrainers.filter((trainer) =>
    trainer.trainerSubjects.includes(course.subject)
  );

  // Return matching trainers or all available trainers if no match
  return matchingTrainers.length > 0 ? matchingTrainers : filteredTrainers;
};

module.exports = { getBestAvailableTrainers };
