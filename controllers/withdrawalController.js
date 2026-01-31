const { createWithdrawal, getAuthorWithdrawals } = require('../services/withdrawalService');

const requestWithdrawal = (req, res) => {
  const { author_id, amount } = req.body;
  const result = createWithdrawal(author_id, amount);
  
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }
  
  res.status(201).json(result.data);
};

const getWithdrawals = (req, res) => {
  const authorId = parseInt(req.params.id);
  const authors = require('../data/authors');
  const author = authors.find(a => a.id === authorId);
  
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  
  const authorWithdrawals = getAuthorWithdrawals(authorId);
  res.json(authorWithdrawals);
};

module.exports = {
  requestWithdrawal,
  getWithdrawals
};