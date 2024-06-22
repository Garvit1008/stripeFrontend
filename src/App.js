import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import components
import Navbar from './components/Navbar';
import Plans from './components/Plans';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import Checkout from './components/Checkout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (res.data) {
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.error('Authentication error:', err);
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCartItems([]); // Clear cart items on logout
  };

  const addToCart = (item) => {
    setCartItems(prevCartItems => [...prevCartItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== itemId));
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} cartCount={cartItems.length} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Plans addToCart={addToCart} />} />
            <Route path="/register" element={!isAuthenticated ? <Register onRegister={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
            <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/login" />} />
            <Route path="/checkout" element={isAuthenticated ? <Checkout cartItems={cartItems} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
