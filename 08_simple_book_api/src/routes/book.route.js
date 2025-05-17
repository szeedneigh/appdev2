const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controllers');

// Route for GET all books
router.get('/', bookController.getAllBooks);

// Route for GET a single book by ID
router.get('/:id', bookController.validateObjectId, bookController.getBookById);

// Route for POST a new book
router.post('/', bookController.createBook);

// Route for PATCH (update) a book
router.patch('/:id', bookController.validateObjectId, bookController.updateBook);

// Route for DELETE a book
router.delete('/:id', bookController.validateObjectId, bookController.deleteBook);

module.exports = router;
