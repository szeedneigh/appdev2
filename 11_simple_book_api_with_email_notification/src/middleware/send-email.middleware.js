const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
require('dotenv').config();

// Create reusable transporter object using environment variables
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // For development - remove in production
    }
  });
};

// Send email notification for book creation
const sendBookCreatedEmail = async (bookDetails, recipientEmail) => {
  try {
    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();
    console.log('Email server is ready to take our messages');

    // Compile Pug template to HTML
    const templatePath = path.join(__dirname, '../../views/bookCreated.pug');
    const htmlContent = pug.renderFile(templatePath, {
      book: bookDetails
    });

    // Define email options
    const mailOptions = {
      from: `"Book Management System" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME}>`,
      to: recipientEmail || process.env.DEFAULT_RECIPIENT_EMAIL,
      subject: `📚 New Book Added: ${bookDetails.title}`,
      html: htmlContent,
      // Optional text version for clients that don't support HTML
      text: `
New Book Added to Library

Title: ${bookDetails.title}
Author: ${bookDetails.author}
${bookDetails.yearPublished ? `Year Published: ${bookDetails.yearPublished}` : ''}

A new book has been added to the system successfully!

This is an automated notification from your Book Management System.
      `.trim()
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error details for debugging
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// Middleware function to send email after book creation
const sendEmailAfterBookCreation = async (req, res, next) => {
  // This middleware will be called after the book is created
  // The book data should be attached to res.locals.createdBook
  try {
    if (res.locals.createdBook) {
      const bookDetails = res.locals.createdBook;
      const userEmail = req.user.email || process.env.DEFAULT_RECIPIENT_EMAIL;
      
      // Send email notification (don't await to avoid blocking the response)
      sendBookCreatedEmail(bookDetails, userEmail)
        .then(result => {
          if (result.success) {
            console.log(`Email notification sent for book: ${bookDetails.title}`);
          } else {
            console.error(`Failed to send email notification: ${result.error}`);
          }
        })
        .catch(error => {
          console.error('Unexpected error in email notification:', error);
        });
    }
    
    next();
  } catch (error) {
    console.error('Error in email middleware:', error);
    // Don't fail the request if email fails
    next();
  }
};

module.exports = {
  sendBookCreatedEmail,
  sendEmailAfterBookCreation,
  createTransporter
}; 