const express = require('express');
const { getTrainers, createTrainer, updateTrainer } = require('../controllers/trainerController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getTrainers);
router.post('/', protect, createTrainer);
router.patch('/:id', protect, updateTrainer); 

module.exports = router;
