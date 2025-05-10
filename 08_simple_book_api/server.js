const express = require('express');
const BookRoute = require('./routes/book.route');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js and Express');
});

app.use('/', BookRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
