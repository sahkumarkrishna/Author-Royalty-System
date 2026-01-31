require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authorRoutes = require('./routes/authorRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/authors', authorRoutes);
app.use('/withdrawals', withdrawalRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Author Royalty & Withdrawal Management System API",
    endpoints: {
      authors: "GET /authors",
      authorById: "GET /authors/:id",
      authorSales: "GET /authors/:id/sales",
      authorWithdrawals: "GET /authors/:id/withdrawals",
      requestWithdrawal: "POST /withdrawals",
      getWithdrawal: "GET /withdrawals/:id"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see the API`);
});