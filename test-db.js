const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Database connection successful!');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();