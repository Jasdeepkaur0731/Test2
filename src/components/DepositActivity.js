import React, { useState } from 'react';

function DepositActivity({ onDeposit, onCancel }) {
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    if (!amount) {
      alert('Please fill in the amount');
      return;
    }
    const depositData = { amount: parseFloat(amount) };
    onDeposit(depositData);
    setAmount('');
  };

  return (
    <div>
      <h2>Deposit</h2>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="modal-buttons">
        <button className="btn btn-primary" onClick={handleDeposit}>Deposit</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DepositActivity;
