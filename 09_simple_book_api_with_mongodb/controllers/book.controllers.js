const Book = require('../models/books');
const mongoose = require('mongoose');

// Middleware to handle ObjectId errors
exports.validateObjectId = (req, res, next) => { 
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: 'Book not found with that ID' });
  }
  next();
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found with that ID' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    
    // Validation
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    
    const newBook = new Book({
      title,
      author
    });
    
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    // Check if at least one field is provided
    if (!title && !author) {
      return res.status(400).json({ message: 'Please provide either title or author to update' });
    }

    // Validate title and author
    if (title && typeof title !== 'string') {
      return res.status(400).json({ message: 'Title must be a string' });
    }
    if (author && typeof author !== 'string') {
      return res.status(400).json({ message: 'Author must be a string' });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    
    // Find and update the book
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(updatedBook);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found with that ID' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found with that ID' });
    }
    res.status(500).json({ message: error.message });
  }
};