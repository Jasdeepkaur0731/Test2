import React, { useState } from 'react';
import Transactions from './Transactions';
import DepositWithdrawETransfer from './DepositWithdrawETransfer';
import './Dashboard.css';

const Dashboard = ({ addTransaction }) => {
  const [transactions, setTransactions] = useState([]);
  const [nextTransactionId, setNextTransactionId] = useState(1);
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
    const { type, amount, account, toAccount } = transactionData;

    if (type === 'E-Transfer') {
      if (account === 'Savings Account' && amount <= accountBalances['Savings Account'].balance) {
        setAccountBalances((prevBalances) => ({
          ...prevBalances,
          'Savings Account': {
            ...prevBalances['Savings Account'],
            balance: prevBalances['Savings Account'].balance - amount,
          },
          'Chequing Account': {
            ...prevBalances['Chequing Account'],
            balance: prevBalances['Chequing Account'].balance + amount,
          },
        }));
      } else if (account === 'Chequing Account' && amount <= accountBalances['Chequing Account'].balance) {
        setAccountBalances((prevBalances) => ({
          ...prevBalances,
          'Chequing Account': {
            ...prevBalances['Chequing Account'],
            balance: prevBalances['Chequing Account'].balance - amount,
          },
          'Savings Account': {
            ...prevBalances['Savings Account'],
            balance: prevBalances['Savings Account'].balance + amount,
          },
        }));
      }
    } else {
      if (type === 'Deposit') {
        setAccountBalances((prevBalances) => ({
          ...prevBalances,
          [account]: {
            ...prevBalances[account],
            balance: prevBalances[account].balance + amount,
          },
        }));
      } else if (type === 'Withdraw' && amount <= accountBalances[account].balance) {
        setAccountBalances((prevBalances) => ({
          ...prevBalances,
          [account]: {
            ...prevBalances[account],
            balance: prevBalances[account].balance - amount,
          },
        }));
      } else {
        alert('Insufficient funds');
        return;
      }
    }

    const newTransaction = {
      transactionId: nextTransactionId,
      type,
      accountNumber: accountBalances[account].accountNumber,
      amount,
      timestamp: new Date().toLocaleString(),
      toAccount: toAccount || null,
    };

    setTransactions([...transactions, newTransaction]);
    setNextTransactionId(nextTransactionId + 1);
  };

  return (
    <div className="transaction-area container mt-5">
      <h2>Dashboard</h2>
      <p>Here you will see all transactions</p>

      <div className="transaction-buttons mt-5">
        <button
          className="themebutton btn btn-primary"
          onClick={() => setFormData({ type: 'Deposit', fromAccount: 'Savings Account', amount: 0 })}
        >
          Deposit
        </button>
        <button
          className="themebutton btn btn-primary"
          onClick={() => setFormData({ type: 'Withdraw', fromAccount: 'Savings Account', amount: 0 })}
        >
          Withdraw
        </button>
        <button
          className="themebutton btn btn-primary"
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
          />
        </div>
      )}

      <Transactions transactions={transactions} accountBalances={accountBalances} />
    </div>
  );
};

export default Dashboard;
