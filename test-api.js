const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing connection to backend API...');
    const response = await axios.get('http://localhost:5000/api/auth/profile');
    console.log('API is accessible:', response.status);
  } catch (error) {
    console.log('API test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('The backend server is not running. Please start it with "npm run server"');
    }
  }
}

testAPI();