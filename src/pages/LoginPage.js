import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation - in a real app, you would authenticate with a server
    if (username && password) {
      // Navigate to business type selection page
      navigate('/business-type');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Business Analytics Platform</h2>
        <p className="login-subtitle">Track your products, analyze sales, and get AI-powered recommendations</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <p>Demo credentials: any username/password works</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;