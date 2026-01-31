const express = require('express');
const { requestWithdrawal } = require('../controllers/withdrawalController');
const { getWithdrawalById } = require('../services/withdrawalService');

const router = express.Router();

router.get('/', (req, res) => {
  const withdrawals = require('../data/withdrawals');
  res.json(withdrawals);
});

router.post('/', requestWithdrawal);
router.get('/:id', (req, res) => {
  const withdrawalId = req.params.id;
  const withdrawal = getWithdrawalById(withdrawalId);
  
  if (!withdrawal) {
    return res.status(404).json({ error: "Withdrawal not found" });
  }
  
  res.json(withdrawal);
});

module.exports = router;