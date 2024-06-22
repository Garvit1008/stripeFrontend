import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        onRegister(); // Trigger App component's isAuthenticated update
        navigate('/'); 
      } else {
        setError('Empty token response');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
