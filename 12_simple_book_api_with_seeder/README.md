# Simple Book API with Data Seeding

This is a Node.js Express API for managing books with user authentication, email notifications, and **data seeding functionality** using Faker.js.

## Features

- ✅ User registration and authentication (JWT)
- ✅ CRUD operations for books
- ✅ Email notifications using Nodemailer
- ✅ Input validation with Joi
- ✅ MongoDB integration with Mongoose
- ✅ **Data seeding with realistic fake data**
- ✅ Password hashing with bcrypt
- ✅ CORS support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd 12_simple_book_api_with_seeder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/bookapi
JWT_SECRET=your_jwt_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Database Seeding

This project includes a comprehensive data seeding system using Faker.js to populate your database with realistic test data.

### What the seeder creates:
- **5 fake users** with unique usernames, emails, and hashed passwords
- **10 fake books** with realistic titles, authors, and publication years
- **Proper associations** between books and users

### Running the seeder:

```bash
npm run seed
```

### Seeder features:
- 🔄 **Clears existing data** before seeding (users and books collections)
- 🎭 **Generates realistic data** using Faker.js
- 🔐 **Hashes passwords** using bcrypt (default password: "password123")
- 📊 **Displays summary** of created data after seeding
- ✅ **Proper error handling** and connection management

### Sample output:
```
🌱 Starting database seeding process...

MongoDB Connected Successfully for seeding
Clearing existing data...
✅ Collections cleared successfully
Generating fake users...
✅ Generated 5 fake users
Generating fake books...
✅ Generated 10 fake books

📊 SEEDING SUMMARY:
===================

👥 Users (5):
   1. john.doe (john.doe@example.com)
   2. jane.smith (jane.smith@example.com)
   ...

📚 Books (10):
   1. "The Great Adventure" by Mark Johnson (2019) - Owner: john.doe
   2. "Mystery of Time" by Sarah Wilson (2021) - Owner: jane.smith
   ...

🎉 Database seeding completed successfully!
🔌 Database connection closed
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Books (Protected routes)
- `GET /api/books` - Get all books for the authenticated user
- `POST /api/books` - Create a new book
- `GET /api/books/:id` - Get a specific book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Usage

1. **Start the server:**
```bash
npm start
```

2. **Seed the database with test data:**
```bash
npm run seed
```

3. **Use the API endpoints** with your preferred API client (Postman, curl, etc.)

## Project Structure

```
12_simple_book_api_with_seeder/
├── src/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── validators/           # Input validation schemas
│   └── server.js             # Main server file
├── seeders/
│   └── seed.js               # Database seeder script
├── views/                    # Email templates
├── .env.example              # Environment variables template
├── package.json
└── README.md
```

## Technologies Used

- **Node.js & Express.js** - Backend framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation
- **Nodemailer** - Email notifications
- **@faker-js/faker** - Test data generation
- **Pug** - Template engine for emails
- **CORS** - Cross-origin resource sharing

## Scripts

- `npm start` - Start the application
- `npm run seed` - Run database seeder
- `npm test` - Run tests (not implemented)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `EMAIL_HOST` | SMTP server host | Yes |
| `EMAIL_PORT` | SMTP server port | Yes |
| `EMAIL_USER` | Email username | Yes |
| `EMAIL_PASS` | Email password/app password | Yes |

## License

This project is licensed under the ISC License. 