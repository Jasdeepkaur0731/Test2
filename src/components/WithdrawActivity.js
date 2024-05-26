import React, { useState } from 'react';

function WithdrawActivity({ onWithdraw, onCancel }) {
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    if (!amount) {
      alert('Please fill in the amount');
      return;
    }
    const withdrawData = { amount: parseFloat(amount) };
    onWithdraw(withdrawData);
    setAmount('');
  };

  return (
    <div>
      <h2>Withdraw</h2>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="modal-buttons">
        <button className="btn btn-primary" onClick={handleWithdraw}>Withdraw</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default WithdrawActivity;
