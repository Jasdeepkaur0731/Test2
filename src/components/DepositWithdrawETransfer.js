import React from 'react';

const DepositWithdrawETransfer = ({ type, onTransaction, onCancel, formData, setFormData, accountBalances }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransaction(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>From Account:</label>
        <select
          name="fromAccount"
          value={formData.fromAccount}
          onChange={handleInputChange}
          required
        >
          {Object.keys(accountBalances).map((account) => (
            <option key={account} value={account}>{account}</option>
          ))}
        </select>
      </div>
      {type === 'E-Transfer' && (
        <div>
          <label>To Account:</label>
          <select
            name="toAccount"
            value={formData.toAccount}
            onChange={handleInputChange}
            required
          >
            {Object.keys(accountBalances).map((account) => (
              <option key={account} value={account}>{account}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default DepositWithdrawETransfer;
