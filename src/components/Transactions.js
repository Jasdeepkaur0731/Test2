import React, { useState, useEffect } from 'react';

const Transactions = ({ transactions, accountBalances }) => {
  const [updatedBalances, setUpdatedBalances] = useState({});

  useEffect(() => {
    // Initialize updated balances with the current balances
    setUpdatedBalances({ ...accountBalances });
  }, [accountBalances]);

  const updateBalances = (transaction) => {
    const { type, fromAccount, toAccount, amount } = transaction;

    const updated = { ...updatedBalances };

    if (type === 'Deposit') {
      updated[fromAccount].balance += amount;
    } else if (type === 'Withdraw') {
      updated[fromAccount].balance -= amount;
    } else if (type === 'E-Transfer') {
      updated[fromAccount].balance -= amount;
      updated[toAccount].balance += amount;
    }

    setUpdatedBalances(updated);
  };

  return (
    <div>
      <h3>Transaction History</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Type</th>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Timestamp</th>
            <th>To Account</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => {
              updateBalances(transaction);
              return (
                <tr key={transaction.transactionId}>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.accountNumber}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.timestamp}</td>
                  <td>{transaction.toAccount || '-'}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Updated Account Balances</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(updatedBalances).map(([accountName, accountDetails]) => (
            <tr key={accountName}>
              <td>{accountName}</td>
              <td>{accountDetails.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
