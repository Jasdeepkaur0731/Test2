import React, { useState } from 'react';

const DepositWithdrawETransfer = ({ type, onTransaction, onCancel }) => {
  const [transactionData, setTransactionData] = useState({
    type,
    fromAccount: '',
    toAccount: '',
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransaction(transactionData);
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>Account</label>
        <select
          className="form-control"
          name="fromAccount"
          value={transactionData.fromAccount}
          onChange={handleChange}
          required
        >
          <option value="">Select Account</option>
          <option value="Savings Account">Savings Account</option>
          <option value="Chequing Account">Chequing Account</option>
        </select>
      </div>
      {type === 'E-Transfer' && (
        <div className="form-group">
          <label>To Account</label>
          <select
            className="form-control"
            name="toAccount"
            value={transactionData.toAccount}
            onChange={handleChange}
            required
          >
            <option value="">Select Account</option>
            <option value="Savings Account">Savings Account</option>
            <option value="Chequing Account">Chequing Account</option>
          </select>
        </div>
      )}
      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={transactionData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-success mr-2">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default DepositWithdrawETransfer;
