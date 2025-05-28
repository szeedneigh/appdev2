require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('./config/db');
const bookRoutes = require('./routes/book.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API with MongoDB Atlas!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});