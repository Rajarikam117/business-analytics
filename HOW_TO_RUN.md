# How to Run the Business Analytics Platform

## Option 1: Full Backend Mode (Recommended)

### Prerequisites
1. Install MongoDB locally or sign up for MongoDB Atlas
2. Node.js installed on your system

### Steps
1. Make sure MongoDB is running:
   - For local installation: `mongod` or `net start MongoDB` (Windows)
   - For MongoDB Atlas: Ensure your cluster is active

2. Update the `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/business-analytics
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/business-analytics?retryWrites=true&w=majority
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start both frontend and backend:
   ```
   npm run dev
   ```

5. Open your browser to http://localhost:3000

## Option 2: Fallback Mode (No Backend Required)

If you can't get the backend running, you can still use the application with localStorage persistence:

1. Install dependencies:
   ```
   npm install
   ```

2. Start only the frontend:
   ```
   npm start
   ```

3. On the login page, use the "Fallback Login" button to bypass backend authentication

4. All data will be stored in your browser's localStorage

## Troubleshooting

### Backend Not Starting
1. Check if MongoDB is running
2. Verify your MONGO_URI in the .env file
3. Check the terminal output for error messages

### Login Issues
1. Make sure the backend server is running (port 5000)
2. Check browser console for network errors
3. Try the fallback login option

### Data Not Persisting
1. In fallback mode, data is stored in localStorage and will be lost if you clear browser data
2. In backend mode, data is stored in MongoDB database

## API Endpoints

When the backend is running, the following endpoints are available:

- Auth: http://localhost:5000/api/auth
- Products: http://localhost:5000/api/products

You can test if the backend is running by visiting http://localhost:5000/api/auth/profile in your browser (you should see a JSON response about missing token).