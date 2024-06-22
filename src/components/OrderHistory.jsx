// src/components/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/orders', {
        headers: { Authorization: token }
      });
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <h2>{order.plan.name}</h2>
            <p>Price: {order.amount} INR</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
