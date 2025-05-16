const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/book.controllers');

// Check book list
router.get('/api/books', getAllBooks);

// Check if the book exists
router.get('/api/books/:id', getBookById);

// Add a new book
router.post('/api/books', createBook);

// Update an existing book
router.patch('/api/books/:id', updateBook);

// Delete a book
router.delete('/api/books/:id', deleteBook);

module.exports = router;
