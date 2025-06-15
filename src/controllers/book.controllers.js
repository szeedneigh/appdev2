const Book = require('../models/book');
const mongoose = require('mongoose');
const { emailNotificationMiddleware } = require('../middleware/send-email.middleware');

// Get all books (only books created by the authenticated user)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.userId });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Book not found with that ID' });
    }
    
    const book = await Book.findOne({ 
      _id: req.params.id,
      user: req.user.userId 
    });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    
    // Validation
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    
    const newBook = new Book({
      title,
      author,
      year: year || undefined, // Include year if provided
      user: req.user.userId
    });
    
    const savedBook = await newBook.save();
    
    // Send email notification after successful book creation
    try {
      const emailResult = await emailNotificationMiddleware({
        title: savedBook.title,
        author: savedBook.author,
        year: savedBook.year,
        createdAt: savedBook.createdAt
      });
      
      if (emailResult.success) {
        console.log('✅ Email notification sent successfully');
        if (emailResult.previewUrl) {
          console.log('📧 Email preview:', emailResult.previewUrl);
        }
      } else {
        console.log('⚠️ Email notification failed:', emailResult.error);
      }
    } catch (emailError) {
      // Log email error but don't fail the book creation
      console.error('❌ Email notification error:', emailError.message);
    }
    
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Book not found with that ID' });
    }
    
    const { title, author } = req.body;

    // Check if at least one field is provided
    if (!title && !author) {
      return res.status(400).json({ message: 'Please provide either title or author to update' });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    
    // Find and update the book (only if it belongs to the authenticated user)
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Book not found with that ID' });
    }
    
    // Delete the book (only if it belongs to the authenticated user)
    const deletedBook = await Book.findOneAndDelete({ 
      _id: req.params.id,
      user: req.user.userId 
    });
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};