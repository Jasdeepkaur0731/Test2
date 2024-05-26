import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import ContactUs from './components/ContactUs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const url = 'https://json-storage-api.p.rapidapi.com/datalake';
const headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': 'c61942e7cbmsh9697cd1bbbc5744p1f9935jsn649d013f033d',
  'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
};

// Static account number
const accountId = 'USERID-4711';

function App() {
  
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [accountBalances, setAccountBalances] = useState({
    'Savings Account': { accountNumber: '121424', balance: 4500 },
    'Chequing Account': { accountNumber: '958795', balance: 19333 },
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const storeTransaction = async (transaction) => {
    try {
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
            Name: 'Transaction',
            Creator: {
              '@type': 'UserAccount',
              Identifier: accountId // Use static account number
            },
            About: {
              '@type': 'Organization'
            },
            Amount: transaction.amount,
            Balance: transaction.balance,
            Type: transaction.type,
            SerialNumber: transaction.serial, // Add serial number to the transaction
            Timestamp: new Date().toISOString() // Store the time of the transaction
          }
        })
      });

      const data = await response.json();
      console.log(data);
      // After each transaction, load the latest transactions to update the balance
      loadTransactions();
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  };

  const loadTransactions = async () => {
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
                Identifier: accountId // Use static account number
              }
            }
          }
        })
      });

      const data = await response.json();
      const result = data.Result.ItemListElement.map(item => item.Item);
      // Sort transactions by serial number in ascending order
      result.sort((a, b) => a.SerialNumber - b.SerialNumber);
      setTransactions(result);
      if (result.length > 0) {
        // Update balance to the latest transaction's balance
        const latestBalance = result[result.length - 1].Balance;
        setBalance(latestBalance);
        if (latestBalance < 0) {
          setErrorMessage('Insufficient balance for withdrawal');
        } else {
          setErrorMessage('');
        }
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const clearTransactions = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          '@context': [
            'http://schema4i.org/Thing.jsonld',
            'http://schema4i.org/Action.jsonld',
            'http://schema4i.org/DeleteAction.jsonld'
          ],
          '@type': 'DeleteAction',
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
                Identifier: accountId // Use static account number
              }
            }
          }
        })
      });

      const data = await response.json();
      console.log(data);
      setTransactions([]);
      setBalance(0);
      setErrorMessage('');
    } catch (error) {
      console.error('Error clearing transactions:', error);
    }
  };

  const handleDeposit = async () => {
    const newBalance = balance + parseFloat(amount);
    await storeTransaction({ amount: parseFloat(amount), balance: newBalance, type: 'Deposit', serial: transactions.length + 1 });
    setBalance(newBalance); // Update balance state
    setAmount(0); // Reset input field
    loadTransactions(); // Reload transactions to update balance
  };

  const handleWithdraw = async () => {
    if (amount > balance) {
      setErrorMessage('Insufficient balance for withdrawal');
      return;
    }
    const newBalance = balance - parseFloat(amount);
    await storeTransaction({ amount: parseFloat(amount), balance: newBalance, type: 'Withdraw', serial: transactions.length + 1 });
    setBalance(newBalance); // Update balance state
    setAmount(0); // Reset input field
    loadTransactions(); // Reload transactions to update balance
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    const accountNumber = localStorage.getItem('accountNumber');
    if (accountNumber) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accountNumber');
    setIsLoggedIn(false);
    window.location.href = '/';
  };


  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#6a1b9a' }}>
          <Link className="navbar-brand" to="/">
            <img src="/bank-logo.png" alt="logo" height="30" className="d-inline-block align-top" />
            JASBANK
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
            

              
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link"  onClick={handleLogout} >Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>

                </>
              )}
              
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
                 </li>
           
            </ul>
          </div>
        </nav>
     

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>

        <footer className="footer">
          <div className="container">
            <span className="text-muted">© 2024 JASBANK. All rights reserved.</span>
          </div>
        </footer>
        {/* <div className="App">
          <h1>Transaction App</h1>
          <div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>
          <div>
            <h2>Current Balance: ${balance}</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
          <div>
            <button onClick={loadTransactions}>Load Transactions</button>
            <button onClick={clearTransactions}>Clear Transactions</button>
            <h2>Transactions:</h2>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.SerialNumber}</td>
                    <td>{transaction.Type}</td>
                    <td>${transaction.Amount}</td>
                    <td>${transaction.Balance}</td>
                    <td>{transaction.Timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </Router>
  );
}

export default App;
