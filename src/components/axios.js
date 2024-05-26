import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionHistory() {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/transactions')
      .then(response => {
        setTransactionData(response.data);
      })
      .catch(error => {
        console.log('Error fetching transaction data:', error);
      });
  }, []);

  return (
    <div>
      <h3>Transaction History</h3>
      <ul>
        {transactionData.map((transaction, index) => (
          <li key={index}>
            {transaction.type}: ${transaction.amount} on {new Date(transaction.date).toLocaleString()} to {transaction.toAccountNumber || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
