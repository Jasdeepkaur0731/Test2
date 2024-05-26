import React, { useState } from 'react';

function ETransferActivity({ onETransfer, onCancel }) {
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  const handleETransfer = () => {
    if (!toAccount || !amount) {
      alert('Please fill in all fields');
      return;
    }
    const eTransferData = { toAccount, amount: parseFloat(amount) };
    onETransfer(eTransferData);
    setToAccount('');
    setAmount('');
  };

  return (
    <div>
      <h2>E-Transfer</h2>
      <label>To Account:</label>
      <input
        type="text"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        placeholder="Recipient's Account Number"
      />
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="modal-buttons">
        <button className="btn btn-primary" onClick={handleETransfer}>Send</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default ETransferActivity;
