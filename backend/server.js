require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Import the cors package
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const trainerRoutes = require('./routes/trainer');

// Initialize app
const app = express();

// Middleware: Enable CORS for all routes
app.use(cors());  // This enables CORS for all routes

// Connect to MongoDB
connectDB();

// Middldb.trainers.deleteMany({ trainerEmail: null });
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/trainers', trainerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api`);
});
