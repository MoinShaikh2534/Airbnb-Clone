const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables
const app = express();

app.use(express.json());

// Load secret key from environment variable
const SECRET_KEY = process.env.SECRET_KEY;
const users = [{ email: 'user@example.com', password: bcrypt.hashSync('password123', 10) }]; // Mock users

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route example
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    res.json({ message: 'Protected content', user: decoded });
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
