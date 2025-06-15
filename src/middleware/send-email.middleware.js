const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
require('dotenv').config();

// Create reusable Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME || 'ethereal.user@ethereal.email',
      pass: process.env.SMTP_PASSWORD || 'ethereal.password'
    }
  });
};

// Function to send book creation notification email
const sendBookCreatedEmail = async (bookData, userEmail = null) => {
  try {
    // Create transporter
    const transporter = createTransporter();

    // Compile Pug template to HTML
    const templatePath = path.join(__dirname, '../../views/bookCreated.pug');
    const html = pug.renderFile(templatePath, {
      title: bookData.title,
      author: bookData.author,
      year: bookData.year || null,
      createdAt: bookData.createdAt || new Date()
    });

    // Email options
    const mailOptions = {
      from: `"Book Management System" <${process.env.SMTP_FROM_EMAIL || 'noreply@bookmanagement.com'}>`,
      to: userEmail || process.env.DEFAULT_RECIPIENT_EMAIL || 'admin@bookmanagement.com',
      subject: `📚 New Book Added: ${bookData.title}`,
      html: html,
      // Optional: Add text version as fallback
      text: `
        New Book Added Successfully!
        
        Book Details:
        - Title: ${bookData.title}
        - Author: ${bookData.author}
        ${bookData.year ? `- Year Published: ${bookData.year}` : ''}
        - Date Added: ${new Date().toLocaleDateString()}
        
        A new book has been successfully added to the system.
        
        Thank you for using our Book Management System!
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);
    
    // For testing with Ethereal, log the preview URL
    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    
    // Don't throw error to prevent book creation from failing
    // Just log the error and return failure status
    return {
      success: false,
      error: error.message
    };
  }
};

// Middleware function for Express routes
const emailNotificationMiddleware = (bookData, userEmail) => {
  // Return a promise so it can be awaited in the controller
  return sendBookCreatedEmail(bookData, userEmail);
};

// Test email configuration (useful for debugging)
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};

module.exports = {
  sendBookCreatedEmail,
  emailNotificationMiddleware,
  testEmailConfig,
  createTransporter
}; 