const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models and database config
const User = require('../src/models/users');
const Book = require('../src/models/book');
const connectDB = require('../src/config/db');

// Clear existing data
const clearData = async () => {
    try {
        await User.deleteMany({});
        await Book.deleteMany({});
        console.log('Existing data cleared successfully');
    } catch (error) {
        console.error('Error clearing data:', error);
        throw error;
    }
};

// Generate fake users
const generateUsers = async (count = 5) => {
    const users = [];
    const saltRounds = 10;

    for (let i = 0; i < count; i++) {
        const password = faker.internet.password({ min: 6, max: 12 });
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: hashedPassword
        };

        users.push(user);
        console.log(`Generated user: ${user.username} (${user.email}) - Password: ${password}`);
    }

    return users;
};

// Generate fake books
const generateBooks = (users, count = 10) => {
    const books = [];

    for (let i = 0; i < count; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        const book = {
            title: faker.commerce.productName(),
            author: faker.person.fullName(),
            user: randomUser._id // Associate book with a user using the correct field name
        };

        books.push(book);
        console.log(`Generated book: "${book.title}" by ${book.author} - Owner: ${randomUser.username}`);
    }

    return books;
};

// Main seeding function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');
        
        // Set default MongoDB URI if not provided
        if (!process.env.MONGODB_URI) {
            process.env.MONGODB_URI = 'mongodb://localhost:27017/bookapi';
            console.log('Using default MongoDB URI: mongodb://localhost:27017/bookapi');
        }
        
        // Connect to database
        await connectDB();
        
        // Clear existing data
        await clearData();
        
        // Generate and insert users
        console.log('\n👥 Generating users...');
        const userData = await generateUsers(5);
        const insertedUsers = await User.insertMany(userData);
        console.log(`✅ ${insertedUsers.length} users created successfully`);
        
        // Generate and insert books
        console.log('\n📚 Generating books...');
        const bookData = generateBooks(insertedUsers, 10);
        const insertedBooks = await Book.insertMany(bookData);
        console.log(`✅ ${insertedBooks.length} books created successfully`);
        
        console.log('\n🎉 Database seeding completed successfully!');
        console.log(`\n📊 Summary:`);
        console.log(`   Users created: ${insertedUsers.length}`);
        console.log(`   Books created: ${insertedBooks.length}`);
        
    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Run the seeder
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase }; 