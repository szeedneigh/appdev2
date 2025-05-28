const express = require('express');
const router = express.Router();

// Import controllers (to be created)
const { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} = require('../controllers/book.controllers');

// Get all books
router.get('/', getAllBooks);

// Get book by ID
router.get('/:id', getBookById);

// Create a new book
router.post('/', createBook);

// Update a book
router.patch('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router;