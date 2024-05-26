const router = require('express').Router();
let Transaction = require('../models/transaction.model');

router.route('/').get((req, res) => {
  Transaction.find()
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const accountNumber = req.body.accountNumber;
  const type = req.body.type;
  const amount = Number(req.body.amount);
  const date = Date.parse(req.body.date);
  const toAccountNumber = req.body.toAccountNumber;

  const newTransaction = new Transaction({
    accountNumber,
    type,
    amount,
    date,
    toAccountNumber
  });

  newTransaction.save()
    .then(() => res.json('Transaction added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
