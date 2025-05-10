const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: '48 Laws of Power', author: 'Robert Greene' },
  { id: 2, title: 'The Art of War', author: 'Sun Tzu' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear' },
];

// Check book list
router.get('/api/books', (req, res) => {
  res.json(books);
});

// Check if the book exists
router.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id);
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  res.json(book);
});

// Add a new book
router.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Update an existing book
router.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  if (req.body.title) {
    book.title = req.body.title;
  }

  if (req.body.author) {
    book.author = req.body.author;
  }

  res.json(book);
});

// Delete a book
router.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  books = books.filter(b => b.id !== bookId);

  res.json({ message: `The book ${book.title} with is deleted` });
})

module.exports = router;
