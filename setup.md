# Database Setup Instructions

## Option 1: Using MongoDB Atlas (Recommended for production)

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Add your IP address to the whitelist (or allow access from anywhere for development)
5. Get the connection string and update the MONGO_URI in the .env file

## Option 2: Using Local MongoDB Installation

### Windows Installation:
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Start MongoDB service:
   ```
   net start MongoDB
   ```

### macOS Installation:
1. Install MongoDB using Homebrew:
   ```
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```
2. Start MongoDB service:
   ```
   brew services start mongodb-community@6.0
   ```

### Linux Installation:
1. Follow the official MongoDB installation guide for your distribution
2. Start MongoDB service:
   ```
   sudo systemctl start mongod
   ```

## Environment Configuration

Update the .env file with your MongoDB connection string:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
```

For local development, the MONGO_URI would typically be:
```
MONGO_URI=mongodb://localhost:27017/business-analytics
```

For MongoDB Atlas, it would look like:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/business-analytics?retryWrites=true&w=majority
```

## Running the Application

1. Make sure MongoDB is running
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

This will start both the React frontend (on port 3000) and the Express backend (on port 5000).