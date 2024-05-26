import React, { useState, useEffect } from 'react';
import Transactions from './Transactions';

const ParentComponent = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('/api/accounts')
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts data:', error));
  }, []);

  return <Transactions accounts={accounts} />;
};

export default ParentComponent;
