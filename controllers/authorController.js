const authors = require('../data/authors');
const { calculateAuthorEarnings, calculateCurrentBalance, getAuthorBookDetails } = require('../services/royaltyService');

const getAllAuthors = (req, res) => {
  const authorsWithEarnings = authors.map(author => ({
    id: author.id,
    name: author.name,
    total_earnings: calculateAuthorEarnings(author.id),
    current_balance: calculateCurrentBalance(author.id)
  }));
  res.json(authorsWithEarnings);
};

const getAuthorById = (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);
  
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  
  const authorBooks = getAuthorBookDetails(authorId);
  const totalEarnings = calculateAuthorEarnings(authorId);
  const currentBalance = calculateCurrentBalance(authorId);
  
  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    current_balance: currentBalance,
    total_earnings: totalEarnings,
    total_books: authorBooks.length,
    books: authorBooks
  });
};

const getAuthorSalesById = (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);
  
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  
  const books = require('../data/books');
  const sales = require('../data/sales');
  const authorBooks = books.filter(book => book.author_id === authorId);
  const authorSales = [];
  
  authorBooks.forEach(book => {
    const bookSales = sales.filter(sale => sale.book_id === book.id);
    bookSales.forEach(sale => {
      authorSales.push({
        book_title: book.title,
        quantity: sale.quantity,
        royalty_earned: sale.quantity * book.royalty_per_sale,
        sale_date: sale.sale_date
      });
    });
  });
  
  authorSales.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
  res.json(authorSales);
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  getAuthorSalesById
};