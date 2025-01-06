import { useNavigate } from 'react-router-dom';
import React from 'react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterClick = async e => {
    e.preventDefault();

    const credentials = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      email: document.getElementById('email').value
    };

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred');
    }
  };

  return (
    <form onSubmit={handleRegisterClick}>
      <input type="text" id="username" placeholder="Username" />
      <input type="password" id="password" placeholder="Password" />
      <input type="email" id="email" placeholder="Email" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
