const books = require('../data/books');
const sales = require('../data/sales');
const withdrawals = require('../data/withdrawals');

function calculateAuthorEarnings(authorId) {
  const authorBooks = books.filter(book => book.author_id === authorId);
  let totalEarnings = 0;
  
  authorBooks.forEach(book => {
    const bookSales = sales.filter(sale => sale.book_id === book.id);
    const totalSold = bookSales.reduce((sum, sale) => sum + sale.quantity, 0);
    totalEarnings += totalSold * book.royalty_per_sale;
  });
  
  return totalEarnings;
}

function calculateCurrentBalance(authorId) {
  const totalEarnings = calculateAuthorEarnings(authorId);
  const totalWithdrawn = withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);
  
  return totalEarnings - totalWithdrawn;
}

function getAuthorBookDetails(authorId) {
  const authorBooks = books.filter(book => book.author_id === authorId);
  
  return authorBooks.map(book => {
    const bookSales = sales.filter(sale => sale.book_id === book.id);
    const totalSold = bookSales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalRoyalty = totalSold * book.royalty_per_sale;
    
    return {
      id: book.id,
      title: book.title,
      royalty_per_sale: book.royalty_per_sale,
      total_sold: totalSold,
      total_royalty: totalRoyalty
    };
  });
}

module.exports = {
  calculateAuthorEarnings,
  calculateCurrentBalance,
  getAuthorBookDetails
};