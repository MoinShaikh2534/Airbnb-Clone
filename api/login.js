const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = 'your_secret_key'; // Use a strong secret key
let users = [
  { email: 'user@example.com', password: bcrypt.hashSync('password123', 10) }, // Mock user data
]; 

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Create a JWT token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  // Send token in the response
  res.json({ token });
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
