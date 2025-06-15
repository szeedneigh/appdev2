const { sendBookCreatedEmail, createTransporter } = require('./src/middleware/send-email.middleware');
require('dotenv').config();

// Test email configuration and sending
async function testEmailConfiguration() {
  console.log('🧪 Testing Email Configuration...\n');
  
  // Check if required environment variables are set
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_USERNAME', 'SMTP_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease check your .env file and ensure all email configuration variables are set.');
    process.exit(1);
  }
  
  // Display current configuration
  console.log('📧 Current Email Configuration:');
  console.log(`   SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`   SMTP Port: ${process.env.SMTP_PORT || 587}`);
  console.log(`   SMTP Username: ${process.env.SMTP_USERNAME}`);
  console.log(`   SMTP Secure: ${process.env.SMTP_SECURE || 'false'}`);
  console.log(`   From Email: ${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME}`);
  console.log(`   Default Recipient: ${process.env.DEFAULT_RECIPIENT_EMAIL || 'Not set'}\n`);
  
  try {
    // Test transporter connection
    console.log('🔌 Testing SMTP connection...');
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');
    
    // Test email sending with sample book data
    console.log('📤 Testing email sending...');
    const sampleBook = {
      title: 'Test Book - The Art of Programming',
      author: 'John Developer',
      yearPublished: 2024,
      createdAt: new Date()
    };
    
    const testEmail = process.env.DEFAULT_RECIPIENT_EMAIL || process.env.SMTP_USERNAME;
    console.log(`   Sending test email to: ${testEmail}`);
    
    const result = await sendBookCreatedEmail(sampleBook, testEmail);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log(`   Message ID: ${result.messageId}`);
      console.log(`   Response: ${result.response || 'No response details'}`);
    } else {
      console.error('❌ Failed to send test email:');
      console.error(`   Error: ${result.error}`);
      console.error(`   Code: ${result.code || 'No error code'}`);
    }
    
  } catch (error) {
    console.error('❌ Email test failed:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code || 'No error code'}`);
    
    // Provide helpful troubleshooting tips
    console.log('\n🔧 Troubleshooting Tips:');
    if (error.message.includes('authentication') || error.code === 'EAUTH') {
      console.log('   - Check your SMTP username and password');
      console.log('   - For Gmail, use an App Password instead of your regular password');
      console.log('   - Ensure 2FA is enabled for Gmail and generate an App Password');
    } else if (error.message.includes('connect') || error.code === 'ECONNECTION') {
      console.log('   - Check your SMTP host and port settings');
      console.log('   - Verify your internet connection');
      console.log('   - Check if your firewall is blocking the connection');
    } else if (error.message.includes('timeout')) {
      console.log('   - The email server might be slow or overloaded');
      console.log('   - Try again in a few minutes');
    }
    console.log('   - Double-check all environment variables in your .env file');
    console.log('   - Consider using a test service like Mailtrap for development');
  }
  
  console.log('\n🎯 Test completed!');
}

// Run the test
testEmailConfiguration(); 