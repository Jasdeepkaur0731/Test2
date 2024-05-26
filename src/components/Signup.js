import React, { useState, useEffect } from 'react';
import './Signup.css';
import signupBackgroundImage from './signup-background-image.jpg'; // Adjust the path accordingly

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [lastAccountNumber, setLastAccountNumber] = useState(4711);

  const url = 'https://json-storage-api.p.rapidapi.com/datalake';
  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': 'c61942e7cbmsh9697cd1bbbc5744p1f9935jsn649d013f033d',
    'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
  };

  useEffect(() => {
    loadUsers();
    getLastAccountNumber();
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

  const getLastAccountNumber = async () => {
    try {
      const response = await fetch('https://your-api.com/last-account-number');
      const data = await response.json();
      setLastAccountNumber(data.lastAccountNumber);
    } catch (error) {
      console.error('Error fetching last account number:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const newAccountNumber = lastAccountNumber + users.length + 1;

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          '@context': [
            'http://schema4i.org/Thing.jsonld',
            'http://schema4i.org/Action.jsonld',
            'http://schema4i.org/CreateAction.jsonld'
          ],
          '@type': 'CreateAction',
          Result: {
            '@context': [
              'http://schema4i.org/DataLakeItem.jsonld',
              'http://schema4i.org/UserAccount.jsonld',
              'http://schema4i.org/OfferForPurchase.jsonld',
              'http://schema4i.org/Offer.jsonld',
              'http://schema4i.org/Organization.jsonld',
              'http://schema4i.org/PostalAddress.jsonld'
            ],
            '@type': 'DataLakeItem',
            Name: username,
            Creator: {
              '@type': 'UserAccount',
              Identifier: 'USERID-4711',
            },
            About: {
              '@type': 'Organization',
              Email: email,
              Password: password,
              AccountNumber: newAccountNumber
            }
          }
        })
      });
      await response.text();
      setUsername('');
      setEmail('');
      setPassword('');
      setErrorMessage('');
      loadUsers();
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className="Signup" style={{ backgroundImage: `url(${signupBackgroundImage})` }}>
      <div className="Signup-container">
        <h2 className="Signup-header">Signup</h2>
        <form onSubmit={e => { e.preventDefault(); handleSignup(); }}>
          <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Signup</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
