const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Book API with Email Notifications...\n');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/book_api_email_notification

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex_${Math.random().toString(36).substring(2)}
JWT_EXPIRE=7d

# Email Configuration (Ethereal for testing)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USERNAME=ethereal.user@ethereal.email
SMTP_PASSWORD=ethereal.password

# Email Settings
SMTP_FROM_EMAIL=noreply@bookmanagement.com
DEFAULT_RECIPIENT_EMAIL=admin@bookmanagement.com

# Application Settings
NODE_ENV=development
PORT=3000
`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file with default configuration');
} else {
  console.log('⚠️  .env file already exists - skipping creation');
}

console.log('\n📋 Setup Complete! Next steps:');
console.log('');
console.log('1. Install dependencies:');
console.log('   npm install');
console.log('');
console.log('2. Test email system:');
console.log('   node test-email.js');
console.log('');
console.log('3. Start the server:');
console.log('   npm start');
console.log('');
console.log('📧 Email Provider Options:');
console.log('• Ethereal (Default): Ready for testing');
console.log('• Gmail: Edit .env with your Gmail App Password');
console.log('• Mailtrap: Edit .env with your Mailtrap credentials');
console.log('');
console.log('�� Happy coding!'); 