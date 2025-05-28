const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book.route');
const authRoutes = require('./routes/auth.route');
const authMiddleware = require('./middleware/auth');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', authMiddleware, bookRoutes); // Protect all book routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});