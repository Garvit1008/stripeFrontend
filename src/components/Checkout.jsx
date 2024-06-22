import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ planId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await axios.post('/api/payment/checkout', { planId });

        const result = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
        });

        if (result.error) {
            setError(result.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

const Checkout = ({ planId }) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm planId={planId} />
    </Elements>
);

export default Checkout;
