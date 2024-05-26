// import React, { useState } from 'react';
// import './Transactions.css';

// const Transactions = ({ transactions, accountBalances }) => {
//   const [message, setMessage] = useState('');

//   const loadTransaction = async () => {
//     const url = 'https://json-storage-api.p.rapidapi.com/datalake';
//     const lastTransaction = transactions[transactions.length - 1] || {};
//     const lastSerialNumber = lastTransaction.serialNumber || 0;
//     const newSerialNumber = lastSerialNumber + 1;
//     const newBalance = accountBalances['Savings Account'].balance - 1; // Example balance update
//     const currentTime = new Date().toISOString();

//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-RapidAPI-Key': 'c61942e7cbmsh9697cd1bbbc5744p1f9935jsn649d013f033d',
//         'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
//       },
//       body: JSON.stringify({
//         '@context': [
//           'http://schema4i.org/Thing.jsonld',
//           'http://schema4i.org/Action.jsonld',
//           'http://schema4i.org/CreateAction.jsonld'
//         ],
//         '@type': 'CreateAction',
//         ActionStatus: 'CompleteActionStatus',
//         Result: {
//           '@context': [
//             'http://schema4i.org/DataLakeItem.jsonld',
//             'http://schema4i.org/UserAccount.jsonld',
//             'http://schema4i.org/OfferForPurchase.jsonld',
//             'http://schema4i.org/Offer.jsonld',
//             'http://schema4i.org/Organization.jsonld',
//             'http://schema4i.org/PostalAddress.jsonld'
//           ],
//           '@type': 'DataLakeItem',
//           Identifier: newSerialNumber.toString(),
//           Name: 'X-PLOR Group',
//           Creator: {
//             '@type': 'UserAccount',
//             Identifier: 'USERID-4711'
//           },
//           About: {
//             '@type': 'Organization',
//             Name: 'X-PLOR GmbH',
//             Address: {
//               '@type': 'PostalAddress',
//               StreetAddress: 'Lindenstrasse',
//               HouseNumber: '48-52',
//               PostalCode: '40233',
//               AddressLocality: 'Duesseldorf',
//               AddressCountry: 'D'
//             }
//           },
//           transactionTime: currentTime,
//           newBalance: newBalance
//         }
//       })
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();
//       setMessage('Transaction successfully loaded and stored.');
//       console.log(result);
//     } catch (error) {
//       setMessage('Failed to load transaction.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="transactions">
//       <h2>Transactions</h2>
//       <button className="btn btn-primary" onClick={loadTransaction}>Load Transaction</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Transactions;

import React, { useState } from 'react';
import './Transactions.css';

const TransactionHistory = ({ transactions, accountBalances }) => {
  const [message, setMessage] = useState('');

  const loadTransaction = async () => {
    const url = 'https://json-storage-api.p.rapidapi.com/datalake';
    const lastTransaction = transactions[transactions.length - 1] || {};
    const lastSerialNumber = lastTransaction.SerialNumber || 0;
    const newSerialNumber = lastSerialNumber + 1;
    const newBalance = accountBalances['Savings Account'].balance - 1; // Example balance update
    const currentTime = new Date().toISOString();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'c61942e7cbmsh9697cd1bbbc5744p1f9935jsn649d013f033d',
        'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
      },
      body: JSON.stringify({
        '@context': [
          'http://schema4i.org/Thing.jsonld',
          'http://schema4i.org/Action.jsonld',
          'http://schema4i.org/CreateAction.jsonld'
        ],
        '@type': 'CreateAction',
        ActionStatus: 'CompleteActionStatus',
        Result: {
          '@context': [
            'http://schema4i.org/DataLakeItem.jsonld',
            'http://schema4i.org/UserAccount.jsonld',
            'http://schema4i.org/OfferForPurchase.jsonld',
            'http://schema4i.org/Offer.jsonld',
            'http://schema4i.org/Organization.jsonld',
            'http://schema4i.org/PostalAddress.jsonld'
          ],
          '@type': 'DataLakeItem',
          Identifier: newSerialNumber.toString(),
          Name: 'Transaction',
          Creator: {
            '@type': 'UserAccount',
            Identifier: 'USERID-4711'
          },
          transactionTime: currentTime,
          newBalance: newBalance
        }
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMessage('Transaction successfully loaded and stored.');
      console.log(result);
    } catch (error) {
      setMessage('Failed to load transaction.');
      console.error(error);
    }
  };

  return (
    // <div className="transactions">
    //   <h2>Transactions</h2>
    //   <button className="btn btn-primary" onClick={loadTransaction}>Load Transaction</button>
    //   <p>{message}</p>
    //   <table className="transaction-table">
    //     <thead>
    //       <tr>
    //         <th>Serial</th>
    //         <th>Type</th>
    //         <th>Amount</th>
    //         <th>Balance</th>
    //         <th>Timestamp</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {transactions.map((transaction, index) => (
    //         <tr key={index}>
    //           <td>{transaction.SerialNumber}</td>
    //           <td>{transaction.Type}</td>
    //           <td>${transaction.Amount}</td>
    //           <td>${transaction.Balance}</td>
    //           <td>{transaction.Timestamp}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <></>
  );
};

export default TransactionHistory;
