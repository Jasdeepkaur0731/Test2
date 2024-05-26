import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [accountBalances, setAccountBalances] = useState({
    'Savings Account': { accountNumber: '121424', balance: 4500 },
    'Chequing Account': { accountNumber: '958795', balance: 19333 },
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
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
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transactions">Transactions</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home addTransaction={addTransaction} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard addTransaction={addTransaction} /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={isLoggedIn ? <Transactions transactions={transactions} accountBalances={accountBalances} /> : <Navigate to="/login" />} />
        </Routes>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">© 2024 JASBANK. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
