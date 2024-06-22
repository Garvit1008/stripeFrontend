import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Plans = ({ addToCart, redirectToLogin }) => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/plans'); // Replace with your endpoint
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleAddToCart = (item) => {
    if (redirectToLogin) {
      // Redirect to login if not authenticated
      navigate('/login');
    } else {
      addToCart(item);
    }
  };

  return (
    <div>
      <h2>Plans</h2>
      {plans.map((plan) => (
        <div key={plan.id} className="plan">
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          <p>Price: ${plan.price.toFixed(2)}</p>
          <p>Max Users: {plan.maxUsers}</p>
          <button onClick={() => handleAddToCart(plan)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Plans;
