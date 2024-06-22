import React from 'react';
import './PlanCard.module.css';  // Import the CSS file

const PlanCard = ({ plan, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(plan);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{plan.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Price: {plan.price}</h6>
        <h6 className="card-subtitle mb-2 text-muted">Max Users: {plan.maxUsers}</h6>
        <p className="card-text">{plan.description}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default PlanCard;
