require('dotenv').config();
const mongoose = require('mongoose');
 
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in .env file.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB Atlas Connected Successfully'))
.catch(err => {
  console.error(`Error connecting to MongoDB Atlas: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on('error', err => {
  console.error(`MongoDB Atlas Connection Error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Atlas Disconnected');
});
