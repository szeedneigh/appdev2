# 📚 Book API with Data Seeding

A RESTful API for managing books with JWT authentication, email notifications, and comprehensive data seeding functionality.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bookapi_with_seeder
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   PORT=5000
   
   # Email Configuration (Ethereal for testing)
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USERNAME=ethereal.user@ethereal.email
   SMTP_PASSWORD=ethereal.password
   
   SMTP_FROM_EMAIL=noreply@bookmanagement.com
   DEFAULT_RECIPIENT_EMAIL=admin@bookmanagement.com
   ```

3. **Test data generation (no database required):**
   ```bash
   npm run seed:test
   ```

4. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

5. **Start server:**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Books (Requires Authentication)
- `POST /api/books` - Create book (triggers email notification)
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## 📧 Email Notification Features

- ✅ Automatic email when book is created
- 🎨 Beautiful HTML template using Pug
- 📱 Responsive design with modern styling
- 📊 Includes book title, author, year, and confirmation

## 🔧 Email Provider Setup

### Gmail (Production)
1. Enable 2FA on Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Update `.env` with Gmail settings

### Ethereal (Testing - Default)
- Works out of the box for testing
- Visit https://ethereal.email/create for custom test credentials

## 🧪 Testing

Run the email test script:
```bash
node test-email.js
```

This verifies configuration and sends a test email with preview URL.

## 📂 Key Files Added

- `src/middleware/send-email.middleware.js` - Email functionality
- `views/bookCreated.pug` - Email template
- `test-email.js` - Email testing script

## 🌱 Data Seeding Features

- ✅ **Smart Seeder System**: Uses Faker.js for realistic test data
- 📊 **Database Seeding**: Populates MongoDB with sample users and books
- 🔐 **Password Security**: All user passwords are hashed with bcrypt
- 🔗 **Relational Data**: Books are properly linked to users
- 🧪 **Test Mode**: Generate data without database connection
- 🧹 **Clean Setup**: Clears existing data before seeding

### Available Seeding Commands

```bash
# Test data generation (no database required)
npm run seed:test

# Seed database with real data
npm run seed
```

### Seeded Data Structure

**Users (5):**
- Username, email, hashed password
- All passwords are securely hashed with bcrypt

**Books (10):**
- Title, author, and associated user
- Each book belongs to a randomly assigned user

## ✅ Activity 12 Completed

All requirements implemented:
- ✅ Data seeding with Faker.js and bcrypt
- ✅ Custom seed scripts in `seeders/` folder
- ✅ MongoDB connection and data clearing
- ✅ Fake user and book generation
- ✅ NPM scripts for easy execution
- ✅ Test mode for development
- ✅ Proper error handling and logging 

# Simple Book API - Deployed on Render

A RESTful API for managing books with user authentication, email notifications, and data seeding capabilities. This API is deployed on Render with MongoDB Atlas as the database.

## 🚀 Live Deployment

**Base URL:** `https://simple-book-api-deployment.onrender.com`

## 🛠️ Technology Stack

- **Backend:** Node.js with Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer
- **Deployment Platform:** Render
- **Template Engine:** Pug

## 📋 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/signin` | User login | No |

### Book Routes (Protected)
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/books` | Get all books | Required |
| GET | `/api/books/:id` | Get book by ID | Required |
| POST | `/api/books` | Create new book | Required |
| PATCH | `/api/books/:id` | Update book | Required |
| DELETE | `/api/books/:id` | Delete book | Required |

### General
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API welcome message |

## 🔧 Environment Variables

For deployment on Render, configure these environment variables:

```bash
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_complex
JWT_EXPIRES_IN=24h

# Email Configuration (Optional)
EMAIL_FROM=your-email@example.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password

# Environment
NODE_ENV=production
```

## 🚀 Deployment Instructions

### Prerequisites
1. MongoDB Atlas account and cluster
2. Render account
3. Git repository with the code

### Steps to Deploy

1. **Prepare MongoDB Atlas:**
   - Create a cluster on MongoDB Atlas
   - Create a database user
   - Get the connection string
   - Whitelist Render's IP addresses (0.0.0.0/0 for simplicity)

2. **Deploy to Render:**
   - Connect your GitHub repository to Render
   - Create a new Web Service
   - Set the build command: `npm install`
   - Set the start command: `npm start`
   - Configure all environment variables listed above

3. **Environment Variables Setup:**
   - Add all required environment variables in Render dashboard
   - Ensure MONGODB_URI points to your MongoDB Atlas cluster
   - Generate a strong JWT_SECRET

## 📝 Request/Response Examples

### User Signup
```bash
curl -X POST https://simple-book-api-deployment.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### User Signin
```bash
curl -X POST https://simple-book-api-deployment.onrender.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Book (Protected)
```bash
curl -X POST https://simple-book-api-deployment.onrender.com/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "genre": "Fiction",
    "publishedYear": 1925
  }'
```

### Get All Books (Protected)
```bash
curl -X GET https://simple-book-api-deployment.onrender.com/api/books \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎯 Features

- ✅ User registration and authentication
- ✅ JWT-based authorization
- ✅ Full CRUD operations for books
- ✅ Input validation with Joi
- ✅ Email notifications (optional)
- ✅ Data seeding capabilities
- ✅ Error handling and logging
- ✅ CORS enabled
- ✅ Production-ready deployment

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Environment variables for sensitive data
- CORS configuration
- Error handling without sensitive data exposure

## 📦 Development

### Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start development server: `npm run dev`

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed the database with sample data
- `npm run seed:test` - Seed test data

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error:** Ensure MONGODB_URI is correct and IP is whitelisted
2. **JWT Authentication Error:** Verify JWT_SECRET is set and token format is correct
3. **CORS Issues:** Check if frontend domain is allowed in CORS configuration

### Deployment Logs
Check Render deployment logs for any startup issues or runtime errors.

## 📄 License

ISC License

## 👨‍💻 Author

Created as part of Node.js development coursework - Activity 13 deployment exercise. 