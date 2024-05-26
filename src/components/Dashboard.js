import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import borrowingImage from './borrowing.jpg'; // Adjust the path if necessary
import investmentImage from './investment.jpg'; // Adjust the path if necessary
import savingsImage from './savings.jpg'; // Adjust the path if necessary

const url = 'https://json-storage-api.p.rapidapi.com/datalake';
const headers = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': 'c61942e7cbmsh9697cd1bbbc5744p1f9935jsn649d013f033d',
  'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
};

const accountNumber = localStorage.getItem('accountNumber');
const accountId = 'USERID-'+accountNumber;

const Dashboard = () => {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

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
            SerialNumber: transaction.serial // Add serial number to the transaction
          }
        })
      });

      const data = await response.json();
      console.log(data);
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
      result.sort((a, b) => a.SerialNumber - b.SerialNumber);
      setTransactions(result);
      if (result.length > 0) {
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
    setBalance(newBalance);
    setAmount(0);
    loadTransactions();
  };

  const handleWithdraw = async () => {
    if (amount > balance) {
      setErrorMessage('Insufficient balance for withdrawal');
      return;
    }
    const newBalance = balance - parseFloat(amount);
    await storeTransaction({ amount: parseFloat(amount), balance: newBalance, type: 'Withdraw', serial: transactions.length + 1 });
    setBalance(newBalance);
    setAmount(0);
    loadTransactions();
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-header">Welcome to Your Dashboard</h1>
      <p className="dashboard-intro">Manage your finances with ease and confidence. Explore our services to help you achieve your financial goals.</p>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <img src={borrowingImage} alt="Borrowing" />
          <h3>Borrowing</h3>
          <p>Explore our borrowing options to meet your financial needs.</p>
        </div>
        <div className="dashboard-card">
          <img src={investmentImage} alt="Investment" />
          <h3>Investment</h3>
          <p>Grow your wealth with our tailored investment plans.</p>
        </div>
        <div className="dashboard-card">
          <img src={savingsImage} alt="Savings" />
          <h3>Savings</h3>
          <p>Save for your future with our high-interest savings accounts.</p>
        </div>
      </div>
      <div className="transaction-area">
        <div className="transaction-buttons">
          <input className='form-control' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button className='btn' onClick={handleDeposit}>Deposit</button>
          <button className='btn' onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
      <div>
        <h2>Current Balance: ${balance}</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <div>
        {/* <h2>Transactions:</h2>
        <button className='btn btn-primary' onClick={loadTransactions}>Load Transactions</button>
        <button className='btn btn-primary' onClick={clearTransactions}>Clear Transactions</button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>SL</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Current Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.SerialNumber}</td>
                <td>{transaction.Type}</td>
                <td>${transaction.Amount}</td>
                <td>${transaction.Balance}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default Dashboard;
