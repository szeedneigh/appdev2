# Book API with Email Notifications

This is an enhanced version of the Book Management API that includes email notifications when new books are created. The API features JWT authentication, password hashing, request validation, and automatic email notifications using Nodemailer and Pug templates.

## Features

- ✅ **User Authentication**: JWT-based authentication system
- ✅ **Password Security**: Secure password hashing with bcryptjs  
- ✅ **Book Management**: CRUD operations for books (tied to authenticated users)
- ✅ **Request Validation**: Input validation using Joi
- ✅ **Email Notifications**: Automatic email notifications when books are created
- ✅ **HTML Email Templates**: Beautiful email templates using Pug
- ✅ **Multiple Email Providers**: Support for Gmail, Outlook, Mailtrap, Ethereal, etc.

## New in Version 11: Email Notifications

### Email Features
- 📧 **Automatic Notifications**: Email sent automatically when a book is created
- 🎨 **HTML Templates**: Beautiful, responsive email templates using Pug
- 📱 **Mobile-Friendly**: Email templates are optimized for mobile devices
- ⚡ **Non-Blocking**: Email sending doesn't slow down API responses
- 🔧 **Configurable**: Support for multiple email providers through environment variables

### Email Content
Each notification email includes:
- Book title and author
- Year published (if provided)
- Confirmation message
- Professional formatting with modern design

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure your settings:
```bash
cp env.example .env
```

### 3. Configure Email Settings
Edit your `.env` file with your email provider settings:

#### For Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
DEFAULT_RECIPIENT_EMAIL=recipient@example.com
```

**Note**: For Gmail, you need to use an "App Password" instead of your regular password. Enable 2FA and generate an app password in your Google Account settings.

#### For Outlook:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USERNAME=your-email@outlook.com
SMTP_PASSWORD=your-password
```

#### For Testing (Mailtrap):
```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USERNAME=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
```

### 4. Database Configuration
Ensure MongoDB is running and configure the connection:
```env
MONGODB_URI=mongodb://localhost:27017/bookapi
JWT_SECRET=your_secure_jwt_secret_here
```

### 5. Start the Server
```bash
npm start
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Book Routes (Protected)
- `GET /api/books` - Get all books for authenticated user
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book (triggers email notification)
- `PATCH /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Request Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Create Book (with Email Notification)
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "yearPublished": 1925
  }'
```

## Email Notification Flow

1. User creates a new book via POST `/api/books`
2. Book is saved to database
3. Email notification is triggered automatically
4. Pug template is rendered with book details
5. Email is sent to user's registered email address
6. API responds with created book data
7. Email success/failure is logged (doesn't affect API response)

## Project Structure

```
src/
├── config/
│   └── db.js                    # Database configuration
├── controllers/
│   ├── auth.controllers.js      # Authentication logic
│   └── book.controllers.js      # Book CRUD + email integration
├── middleware/
│   ├── auth.middleware.js       # JWT authentication
│   └── send-email.middleware.js # Email sending functionality
├── models/
│   ├── book.js                  # Book schema
│   └── users.js                 # User schema
├── routes/
│   ├── auth.route.js            # Authentication routes
│   └── book.route.js            # Book routes
└── validators/
    └── auth.validators.js       # Request validation schemas

views/
└── bookCreated.pug              # Email template

env.example                      # Environment variables template
```

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/bookapi` |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | `your_secure_secret_key` |
| `SMTP_HOST` | SMTP server hostname | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | Yes | `587` |
| `SMTP_SECURE` | Use SSL/TLS | No | `false` |
| `SMTP_USERNAME` | Email account username | Yes | `your-email@gmail.com` |
| `SMTP_PASSWORD` | Email account password | Yes | `your-app-password` |
| `SMTP_FROM_EMAIL` | Sender email address | No | `your-email@gmail.com` |
| `DEFAULT_RECIPIENT_EMAIL` | Fallback recipient | No | `admin@company.com` |
| `PORT` | Server port | No | `3000` |

## Troubleshooting

### Email Not Sending
1. Check your SMTP credentials in `.env`
2. Verify email provider settings (host, port, security)
3. For Gmail, ensure you're using an App Password
4. Check console logs for specific error messages
5. Test with a service like Mailtrap for debugging

### Authentication Issues
1. Ensure JWT_SECRET is set in `.env`
2. Check token format: `Authorization: Bearer <token>`
3. Verify token hasn't expired

### Database Connection
1. Ensure MongoDB is running
2. Check MONGODB_URI in `.env`
3. Verify database permissions

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **joi**: Request validation
- **nodemailer**: Email sending
- **pug**: Template engine for emails
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## License

This project is licensed under the ISC License. 