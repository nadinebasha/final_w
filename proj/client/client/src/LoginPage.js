import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Admin credentials
    const adminCredentials = {
      username: 'admin@g.com',
      password: 'admin', // Use your preferred admin credentials
    };

    // Check if the entered email and password match the admin credentials
    if (email === adminCredentials.username && password === adminCredentials.password) {
      setMessage('Admin login successful!');
      navigate('/admin'); // Redirect to the Admin Page
      return;
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Handle "Continue as Guest" button click
  const handleContinueAsGuest = () => {
    navigate('/LandingPage'); // Redirect to LandingPage without login
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleAdminLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit">Login as Admin</button>
      </form>

      {/* "Continue as Guest" Button */}
      <button className="guest-button" onClick={handleContinueAsGuest}>
        Continue as Guest
      </button>
    </div>
  );
}

export default LoginPage;
