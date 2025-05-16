const bookList = [
  { id: 1, title: '48 Laws of Power', author: 'Robert Greene' },
  { id: 2, title: 'The Art of War', author: 'Sun Tzu' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear' }
];

const getAllBooks = (req, res) => {
  res.json(bookList);
};

const getBookById = (req, res) => {
  const book = bookList.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

const createBook = (req, res) => {
  const book = {
    id: bookList.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  bookList.push(book);
  res.status(201).json(book);
};

const updateBook = (req, res) => {
  const book = bookList.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
};

const deleteBook = (req, res) => {
  const bookIndex = bookList.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  const deletedBook = bookList.splice(bookIndex, 1)[0];
  res.json({ message: `Book "${deletedBook.title}" has been deleted` });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
