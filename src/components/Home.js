import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMobileAlt, faHeadset, faExchangeAlt, faHandHoldingUsd, faPiggyBank, faHome, faChartLine, faCreditCard, faUniversity, faHandshake, faDollarSign } from '@fortawesome/free-solid-svg-icons';

function Home() {
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
      <div className="why-bank-section">
        <h2>Why Bank with JAS BANK?</h2>
        <div className="why-bank-list">
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faGlobe} />
            <p>Beneficial for international students</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faMobileAlt} />
            <p>Easy-to-use banking app</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faHeadset} />
            <p>Customer service 24/7</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faExchangeAlt} />
            <p>Foreign exchange services</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faHandHoldingUsd} />
            <p>Send money to parents with good rates</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faPiggyBank} />
            <p>Personal investment options</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faHome} />
            <p>Mortgage services</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faChartLine} />
            <p>Trade online</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faHandshake} />
            <p>Borrowing options</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faUniversity} />
            <p>Investing services</p>
          </div>
          <div className="why-bank-item">
            <FontAwesomeIcon icon={faCreditCard} />
            <p>Chequing, saving, and credit accounts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
