import React, { useState } from 'react';
import DepositActivity from './DepositActivity';
import WithdrawActivity from './WithdrawActivity';
import ETransferActivity from './ETransferActivity';
import DepositButton from './DepositButton';
import './Home.css';

function Home({ addTransaction }) {
  const [modalType, setModalType] = useState('');
  const [currentAmount, setCurrentAmount] = useState(0);

  const handleDeposit = ({ amount }) => {
    setCurrentAmount(currentAmount + amount);
    addTransaction({ type: 'Deposit', amount, date: new Date().toLocaleString() });
    closeModal();
  };

  const handleWithdraw = ({ amount }) => {
    if (amount > currentAmount) {
      alert('Insufficient funds');
      return;
    }
    setCurrentAmount(currentAmount - amount);
    addTransaction({ type: 'Withdraw', amount, date: new Date().toLocaleString() });
    closeModal();
  };

  const handleETransfer = ({ fromAccount, toAccount, amount }) => {
    if (amount > currentAmount) {
      alert('Insufficient funds');
      return;
    }
    setCurrentAmount(currentAmount - amount);
    addTransaction({ type: 'E-Transfer', fromAccount, toAccount, amount, date: new Date().toLocaleString() });
    closeModal();
  };

  const closeModal = () => {
    setModalType('');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="welcome-text">Welcome to JASBANK</h1>
          <p>Your trusted financial partner. Secure your future with our reliable services.</p>
        </div>
        <img src="/hero-image.jpg" alt="Hero" className="hero-image" />
      </div>
      <div className="services-section">
        <div className="service-box">
          <img src="/personal-loan.jpg" alt="Personal Loan" className="service-image" />
          <h3>Personal Loan</h3>
        </div>
        <div className="service-box">
          <img src="/home-loan.jpg" alt="Home Loan" className="service-image" />
          <h3>Home Loan</h3>
        </div>
        <div className="service-box">
          <img src="/investments.jpg" alt="Investments" className="service-image" />
          <h3>Investments</h3>
        </div>
        <div className="service-box">
          <img src="/fd-calculator.jpg" alt="Fixed Deposit Calculator" className="service-image" />
          <h3>Fixed Deposit Calculator</h3>
        </div>
        <div className="service-box">
          <img src="/fixed-deposit.jpg" alt="Fixed Deposits" className="service-image" />
          <h3>Fixed Deposits</h3>
        </div>
      </div>
      <div className="account-section">
        <h2>Current Amount: ${currentAmount.toFixed(2)}</h2>
        <table className="account-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Deposit</th>
              <th>Withdraw</th>
              <th>E-Transfer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Savings Account</td>
              <td><DepositButton onClick={() => setModalType('Deposit')} /></td>
              <td><button className="btn btn-primary" onClick={() => setModalType('Withdraw')}>Withdraw</button></td>
              <td><button className="btn btn-primary" onClick={() => setModalType('E-Transfer')}>E-Transfer</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      {modalType && (
        <div className="modal">
          <div className="modal-content">
            {modalType === 'Deposit' && <DepositActivity onDeposit={handleDeposit} onCancel={closeModal} />}
            {modalType === 'Withdraw' && <WithdrawActivity onWithdraw={handleWithdraw} onCancel={closeModal} />}
            {modalType === 'E-Transfer' && <ETransferActivity onETransfer={handleETransfer} onCancel={closeModal} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
