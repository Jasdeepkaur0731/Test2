import React, { useState } from 'react';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';

const Transactions = ({ accounts }) => {
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const handleDepositClick = (accountId) => {
    setSelectedAccountId(accountId);
    setShowDepositForm(true);
  };

  const handleWithdrawClick = (accountId) => {
    setSelectedAccountId(accountId);
    setShowWithdrawForm(true);
  };

  const handleCloseForm = () => {
    setShowDepositForm(false);
    setShowWithdrawForm(false);
    setSelectedAccountId(null);
  };

  if (!accounts) {
    console.error('Accounts data is undefined or null');
    return <div>Error: Accounts data is missing</div>;
  }

  return (
    <div>
      {accounts.map((account, index) => (
        <div key={index}>
          <h3>{account.name}</h3>
          <p>Balance: {account.balance !== undefined ? account.balance : 'Data unavailable'}</p>
          <button onClick={() => handleDepositClick(account.id)}>Deposit</button>
          <button onClick={() => handleWithdrawClick(account.id)}>Withdraw</button>
        </div>
      ))}

      {showDepositForm && <DepositForm accountId={selectedAccountId} onClose={handleCloseForm} />}
      {showWithdrawForm && <WithdrawForm accountId={selectedAccountId} onClose={handleCloseForm} />}
    </div>
  );
};

export default Transactions;
