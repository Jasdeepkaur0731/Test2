// src/components/DepositWithdrawETransfer.js
import React from 'react';

const DepositWithdrawETransfer = ({ type, onTransaction, onCancel, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransaction(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fromAccount">From Account</label>
        <select
          id="fromAccount"
          name="fromAccount"
          className="form-control"
          value={formData.fromAccount}
          onChange={handleChange}
        >
          <option value="Savings Account">Savings Account</option>
          <option value="Chequing Account">Chequing Account</option>
        </select>
      </div>

      {type === 'E-Transfer' && (
        <div className="form-group">
          <label htmlFor="toAccount">To Account</label>
          <select
            id="toAccount"
            name="toAccount"
            className="form-control"
            value={formData.toAccount}
            onChange={handleChange}
          >
            <option value="Savings Account">Savings Account</option>
            <option value="Chequing Account">Chequing Account</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="form-control"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default DepositWithdrawETransfer;
