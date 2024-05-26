import React, { useState, useEffect } from 'react';

const DepositForm = ({ accountId, onClose }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    // Fetch the balance using the API
    fetch(`/api/accounts/${accountId}/balance`)
      .then(response => response.json())
      .then(data => setBalance(data.balance))
      .catch(error => console.error('Error fetching balance:', error));
  }, [accountId]);

  return (
    <div>
      <h2>Deposit Form</h2>
      <p>Current Balance: {balance !== null ? balance : 'Loading...'}</p>
      <form>
        {/* Your form fields here */}
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DepositForm;
