const express = require('express');
const { getAllAuthors, getAuthorById, getAuthorSalesById } = require('../controllers/authorController');
const { getWithdrawals } = require('../controllers/withdrawalController');

const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.get('/:id/sales', getAuthorSalesById);
router.get('/:id/withdrawals', getWithdrawals);

module.exports = router;