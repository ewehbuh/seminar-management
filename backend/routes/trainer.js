const express = require('express');
const { getTrainers, createTrainer,assignTrainer,getMetadata,  updateTrainer,deleteTrainer,getBestTrainersForCourse } = require('../controllers/trainerController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getTrainers);
router.post('/', protect, createTrainer);
router.patch('/:id', protect, updateTrainer); 
router.delete('/:id', protect, deleteTrainer); 
router.get('/trainers/best/:courseId', getBestTrainersForCourse);
router.post('/assign/:courseId/:trainerId', protect, assignTrainer);
router.get('/metadata',protect, getMetadata);

module.exports = router;


