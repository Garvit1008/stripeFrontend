import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';  // Import the CSS module

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        onLogin();
        navigate('/');
        console.log("User logged in", res.data);
      } else {
        console.log('Empty token response');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.h1}>Login</h1>
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className={styles.input} />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className={styles.input} />
      <button type="submit" className={styles.button}>Login</button>
    </form>
  );
};

export default Login;
