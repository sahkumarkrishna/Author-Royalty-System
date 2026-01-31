const { v4: uuidv4 } = require('uuid');
const authors = require('../data/authors');
const withdrawals = require('../data/withdrawals');
const { calculateCurrentBalance } = require('./royaltyService');

function createWithdrawal(authorId, amount) {
  // Validate author exists
  const author = authors.find(a => a.id === authorId);
  if (!author) {
    return { error: "Author not found", status: 404 };
  }
  
  // Validate minimum amount
  if (amount < 500) {
    return { error: "Minimum withdrawal amount is ₹500", status: 400 };
  }
  
  // Validate sufficient balance
  const currentBalance = calculateCurrentBalance(authorId);
  if (amount > currentBalance) {
    return { error: "Insufficient balance for withdrawal", status: 400 };
  }
  
  // Create withdrawal record
  const withdrawal = {
    id: uuidv4(),
    author_id: authorId,
    amount: amount,
    status: "pending",
    created_at: new Date().toISOString()
  };
  
  withdrawals.push(withdrawal);
  
  const newBalance = currentBalance - amount;
  
  return {
    success: true,
    data: {
      id: withdrawal.id,
      author_id: authorId,
      amount: amount,
      status: "pending",
      created_at: withdrawal.created_at,
      new_balance: newBalance
    }
  };
}

function getAuthorWithdrawals(authorId) {
  return withdrawals
    .filter(w => w.author_id === authorId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map(w => ({
      id: w.id,
      amount: w.amount,
      status: w.status,
      created_at: w.created_at
    }));
}

function getWithdrawalById(withdrawalId) {
  return withdrawals.find(w => w.id === withdrawalId);
}

module.exports = {
  createWithdrawal,
  getAuthorWithdrawals,
  getWithdrawalById
};