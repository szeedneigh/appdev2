const { testEmailConfig, sendBookCreatedEmail } = require('./src/middleware/send-email.middleware');

// Test email configuration and functionality
async function testEmailSystem() {
  console.log('🧪 Testing Email System...\n');
  
  // Test 1: Verify email configuration
  console.log('1️⃣ Testing email configuration...');
  const configValid = await testEmailConfig();
  
  if (!configValid) {
    console.log('❌ Email configuration failed. Please check your .env file.');
    return;
  }
  
  console.log('✅ Email configuration is valid!\n');
  
  // Test 2: Send a test email
  console.log('2️⃣ Sending test email...');
  
  const testBookData = {
    title: 'The Art of Node.js Testing',
    author: 'Jane Developer',
    year: 2024,
    createdAt: new Date()
  };
  
  const emailResult = await sendBookCreatedEmail(testBookData);
  
  if (emailResult.success) {
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', emailResult.messageId);
    
    if (emailResult.previewUrl) {
      console.log('🔗 Preview URL:', emailResult.previewUrl);
      console.log('\n📋 Instructions:');
      console.log('   - Open the preview URL in your browser to see the email');
      console.log('   - If using Ethereal, you can see the email in their web interface');
    }
  } else {
    console.log('❌ Test email failed:', emailResult.error);
  }
  
  console.log('\n🎉 Email system testing completed!');
}

// Run the test
testEmailSystem().catch(console.error); 