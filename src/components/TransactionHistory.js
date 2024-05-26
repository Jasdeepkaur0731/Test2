import React from 'react';
import './TransactionHistory.css';

function Transactions({ transactions }) {
  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Amount</th>
            <th>From Account</th>
            <th>To Account</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.fromAccount || '-'}</td>
              <td>{transaction.toAccount || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
