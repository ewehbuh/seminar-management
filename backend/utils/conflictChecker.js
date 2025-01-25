const isConflict = (courses, newCourse) => {
    return courses.some(
      (course) =>
        course.date === newCourse.date && course.location === newCourse.location
    );
  };
  
  const findBestTrainer = (trainers, course) => {
    return trainers.find(
      (trainer) =>
        trainer.trainingSubjects.includes(course.subject) &&
        !trainer.assignedCourses?.some((c) => c.date === course.date)
    );
  };
  
  module.exports = { isConflict, findBestTrainer };
  