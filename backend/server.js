const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register route
app.post('/register', (req, res) => {
  const { name, email, username, password } = req.body;

  const sql = `INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, username, password], function (err) {
    if (err) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.json({ id: this.lastID, name, email, username });
  });
});

// ✅ Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(sql, [email, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(row);
  });
});

// ✅ Start server
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
