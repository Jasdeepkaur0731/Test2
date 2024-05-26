import React, { useState, useEffect } from 'react';
import './Login.css';
import backgroundImage from './background-image.jpg'; // Adjust the path accordingly
import logo from './logo.png'; // Adjust the path accordingly

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);

  const url = 'https://json-storage-api.p.rapidapi.com/datalake';
  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': 'c61942e7cbmsh9697cd1bbbc5744p1f9935jsn649d013f033d',
    'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          '@context': [
            'http://schema4i.org/Thing.jsonld',
            'http://schema4i.org/Action.jsonld',
            'http://schema4i.org/SearchAction.jsonld'
          ],
          '@type': 'SearchAction',
          Object: {
            '@context': [
              'http://schema4i.org/Thing.jsonld',
              'http://schema4i.org/Filter',
              'http://schema4i.org/DataLakeItem',
              'http://schema4i.org/UserAccount'
            ],
            '@type': 'Filter',
            FilterItem: {
              '@type': 'DataLakeItem',
              Creator: {
                '@type': 'UserAccount',
                Identifier: 'USERID-4711'
              }
            }
          }
        })
      });
      const data = await response.json();
      setUsers(data.Result.ItemListElement.map(item => item.Item));
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleLogin = () => {
    const user = users.find(user => user.About.Email === email && user.About.Password === password);
    if (user) {
      localStorage.setItem('accountNumber', user.About.AccountNumber);
      window.location.href = '/dashboard';
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="Login" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="Login-container">
        <h2 className="Login-header">Login</h2>
        <div className="Login-logo">
          <img src={logo} alt="JASBANK Logo" />
        </div>
        <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
