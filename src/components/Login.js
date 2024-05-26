import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Jasdeep_kaur' && password === 'Jasdeep') {
      onLogin();
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <div className="Login-header">JASBANK</div>
        <div className="Login-logo">
          <img src="/bank-logo.png" alt="JASBANK Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
