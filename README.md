Author Royalty & Withdrawal Management System

🔗 Live API: https://author-royalty-system-app.onrender.com/

🔗 GitHub Repository: https://github.com/sahkumarkrishna/Author-Royalty-System

A RESTful backend system for managing authors, books, royalty calculations based on sales, and withdrawal requests, built using Node.js and Express.

🚀 Overview

This project provides a clean and scalable REST API to:

Track author earnings from book sales

Calculate royalties dynamically

Manage withdrawal requests with business validations

Provide financial insights for each author

The system is designed to be simple, fast, and assignment-ready, focusing on backend logic and API correctness.

🛠 Tech Stack

Backend: Node.js, Express.js

Database: In-memory JSON storage

Dependencies:

cors – Enables cross-origin requests

uuid – Generates unique IDs

Why this tech stack?

Node.js with Express allows rapid API development with excellent performance.
In-memory JSON storage keeps the solution lightweight and easy to test while fulfilling all functional requirements.

✨ Features

📊 Dynamic royalty calculation based on book sales

💸 Withdrawal request handling with strict business rules

👤 Author-wise earnings and financial tracking

🔄 RESTful API design with proper HTTP status codes

⚠️ Centralized error handling

🌐 CORS enabled for frontend integration

🔌 API Endpoints
👤 Authors
Method	Endpoint	Description
GET	/authors	List all authors with earnings summary
GET	/authors/:id	Get detailed author profile with books
GET	/authors/:id/sales	Get complete sales history
GET	/authors/:id/withdrawals	Get withdrawal history
💸 Withdrawals
Method	Endpoint	Description
POST	/withdrawals	Create a withdrawal request
GET	/withdrawals	List all withdrawals
GET	/withdrawals/:id	Get withdrawal by ID
📏 Business Rules Implemented

Minimum withdrawal amount: ₹500

⚙️ Installation & Running Locally
npm install
npm start


Server runs on port 3000 by default

Supports PORT environment variable for production
