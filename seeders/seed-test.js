const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

// Generate fake users (test version)
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

// Generate fake books (test version)
const generateBooks = (users, count = 10) => {
    const books = [];

    for (let i = 0; i < count; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        const book = {
            title: faker.commerce.productName(),
            author: faker.person.fullName(),
            user: randomUser.username // Using username for display purposes in test
        };

        books.push(book);
        console.log(`Generated book: "${book.title}" by ${book.author} - Owner: ${randomUser.username}`);
    }

    return books;
};

// Test seeding function (no database required)
const testSeedGeneration = async () => {
    try {
        console.log('🌱 Testing data generation (no database connection required)...');
        
        // Generate test users
        console.log('\n👥 Generating users...');
        const users = await generateUsers(5);
        console.log(`✅ ${users.length} users generated successfully`);
        
        // Generate test books
        console.log('\n📚 Generating books...');
        const books = generateBooks(users, 10);
        console.log(`✅ ${books.length} books generated successfully`);
        
        console.log('\n🎉 Data generation test completed successfully!');
        console.log(`\n📊 Summary:`);
        console.log(`   Users that would be created: ${users.length}`);
        console.log(`   Books that would be created: ${books.length}`);
        console.log(`\n💡 To actually seed the database:`);
        console.log(`   1. Make sure MongoDB is running`);
        console.log(`   2. Set MONGODB_URI in .env file`);
        console.log(`   3. Run: npm run seed`);
        
    } catch (error) {
        console.error('❌ Error during test generation:', error);
    }
};

// Run the test
testSeedGeneration(); 