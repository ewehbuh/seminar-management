const express = require('express');
const { getCourses, createCourse, assignTrainer, updateCourse,deleteCourse } = require('../controllers/courseController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getCourses);
router.post('/', protect, createCourse);
router.patch('/:id', protect, updateCourse); 
router.delete('/:id',protect, deleteCourse);
router.post('/:courseId/assign/:trainerId', protect, assignTrainer);

module.exports = router;

