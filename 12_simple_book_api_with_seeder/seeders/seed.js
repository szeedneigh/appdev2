require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// Import models
const User = require('../src/models/users');
const Book = require('../src/models/book');

// Database connection function
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('FATAL ERROR: MONGODB_URI is not defined in .env file.');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected Successfully for seeding');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Clear existing data
const clearCollections = async () => {
  try {
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Book.deleteMany({});
    console.log('✅ Collections cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing collections:', error.message);
    throw error;
  }
};

// Generate fake users
const generateUsers = async () => {
  try {
    console.log('Generating fake users...');
    const users = [];
    const saltRounds = 10;

    for (let i = 0; i < 5; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet.username({ firstName, lastName }).toLowerCase();
      const email = faker.internet.email({ firstName, lastName }).toLowerCase();
      const password = await bcrypt.hash('password123', saltRounds);

      const user = new User({
        username,
        email,
        password
      });

      users.push(user);
    }

    const savedUsers = await User.insertMany(users);
    console.log(`✅ Generated ${savedUsers.length} fake users`);
    return savedUsers;
  } catch (error) {
    console.error('❌ Error generating users:', error.message);
    throw error;
  }
};

// Generate fake books
const generateBooks = async (users) => {
  try {
    console.log('Generating fake books...');
    const books = [];

    for (let i = 0; i < 10; i++) {
      // Randomly assign each book to one of the users
      const randomUser = users[Math.floor(Math.random() * users.length)];
      
      const book = new Book({
        title: faker.book.title(),
        author: faker.book.author(),
        yearPublished: faker.date.between({ 
          from: '1900-01-01', 
          to: new Date().getFullYear().toString() 
        }).getFullYear(),
        user: randomUser._id
      });

      books.push(book);
    }

    const savedBooks = await Book.insertMany(books);
    console.log(`✅ Generated ${savedBooks.length} fake books`);
    return savedBooks;
  } catch (error) {
    console.error('❌ Error generating books:', error.message);
    throw error;
  }
};

// Display seeded data summary
const displaySummary = async () => {
  try {
    console.log('\n📊 SEEDING SUMMARY:');
    console.log('===================');
    
    const users = await User.find({}).select('username email');
    const books = await Book.find({}).populate('user', 'username').select('title author yearPublished user');
    
    console.log(`\n👥 Users (${users.length}):`);
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.username} (${user.email})`);
    });
    
    console.log(`\n📚 Books (${books.length}):`);
    books.forEach((book, index) => {
      console.log(`   ${index + 1}. "${book.title}" by ${book.author} (${book.yearPublished}) - Owner: ${book.user.username}`);
    });
    
  } catch (error) {
    console.error('❌ Error displaying summary:', error.message);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding process...\n');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await clearCollections();
    
    // Generate fake data
    const users = await generateUsers();
    await generateBooks(users);
    
    // Display summary
    await displaySummary();
    
    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('\n💥 Database seeding failed:', error.message);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Execute seeding if this file is run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase }; 