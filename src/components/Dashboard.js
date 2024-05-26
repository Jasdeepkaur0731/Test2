import React, { useState } from 'react';
import DepositWithdrawETransfer from './DepositWithdrawETransfer';
import Transactions from './Transactions';
import './Dashboard.css';

const Dashboard = ({ addTransaction, transactions }) => {
  const [formData, setFormData] = useState({
    type: '',
    fromAccount: '',
    toAccount: '',
    amount: 0,
  });

  const [accountBalances, setAccountBalances] = useState({
    'Savings Account': { accountNumber: '121424', balance: 4500 },
    'Chequing Account': { accountNumber: '958795', balance: 19333 },
  });

  const handleTransaction = (transactionData) => {
    const { type, amount, fromAccount, toAccount } = transactionData;

    // Check if the fromAccount exists in accountBalances
    if (!accountBalances[fromAccount]) {
      alert('Invalid account selected');
      return;
    }

    // Save the account type (Savings or Chequing) in the transaction
    const accountType = fromAccount === 'Savings Account' ? 'Savings' : 'Chequing';

    // Use a functional update to ensure state consistency
    setAccountBalances(prevBalances => {
      const updatedBalances = { ...prevBalances };

      if (type === 'E-Transfer') {
        if (fromAccount === 'Savings Account' && amount <= accountBalances['Savings Account'].balance) {
          updatedBalances['Savings Account'].balance -= amount;
          updatedBalances['Chequing Account'].balance += amount;
        } else if (fromAccount === 'Chequing Account' && amount <= accountBalances['Chequing Account'].balance) {
          updatedBalances['Chequing Account'].balance -= amount;
          updatedBalances['Savings Account'].balance += amount;
        } else {
          alert('Insufficient funds for transfer');
          return prevBalances;
        }
      } else if (type === 'Deposit') {
        updatedBalances[fromAccount].balance += amount;
      } else if (type === 'Withdraw' && amount <= accountBalances[fromAccount].balance) {
        updatedBalances[fromAccount].balance -= amount;
      } else {
        alert('Insufficient funds for withdrawal');
        return prevBalances;
        }
      }

      return updatedBalances;
    });

    const newTransaction = {
      transactionId: Date.now(),
      type,
      accountNumber: accountBalances[fromAccount].accountNumber,
      amount,
      timestamp: new Date().toLocaleString(),
      toAccount: toAccount || null,
      accountType, // Save the account type in the transaction
    };

    addTransaction(newTransaction);
  };

  const totalSavings = accountBalances['Savings Account'].balance;
  const totalChequing = accountBalances['Chequing Account'].balance;

  return (
    <div className="transaction-area container mt-5">
      <h2>Dashboard</h2>
      <p className="dashboard-intro">Step into your financial dashboard, where every transaction tells a story of your money journey!</p>

      <div className="transaction-buttons mt-5">
        <button
          className="btn btn-primary"
          onClick={() => setFormData({ type: 'Deposit', fromAccount: 'Savings Account', toAccount: '', amount: 0 })}
        >
          Deposit
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setFormData({ type: 'Withdraw', fromAccount: 'Savings Account', toAccount: '', amount: 0 })}
        >
          Withdraw
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setFormData({ type: 'E-Transfer', fromAccount: 'Savings Account', toAccount: 'Chequing Account', amount: 0 })}
        >
          Transfer
        </button>
      </div>

      {formData.type && (
        <div className="transaction-form mt-3">
          <h3>{formData.type} Form</h3>
          <DepositWithdrawETransfer
            type={formData.type}
            onTransaction={handleTransaction}
            onCancel={() => setFormData({ type: '', fromAccount: '', toAccount: '', amount: 0 })}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}

      <Transactions transactions={transactions} accountBalances={accountBalances} />

      <div>
        <h3>Total Amount</h3>
        {/* Display total amounts for savings and chequing accounts */}
        <p>Savings: ${parseFloat(totalSavings).toFixed(2)}</p>
        <p>Chequing: ${parseFloat(totalChequing).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Dashboard;