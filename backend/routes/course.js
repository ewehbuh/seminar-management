const express = require('express');
const { getCourses, createCourse, assignTrainer, updateCourse } = require('../controllers/courseController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getCourses);
router.post('/', protect, createCourse);
router.patch('/:id', protect, updateCourse); 
router.post('/:courseId/assign/:trainerId', protect, assignTrainer);

module.exports = router;
