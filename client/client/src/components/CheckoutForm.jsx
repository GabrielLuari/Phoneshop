import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ productPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        throw error;
      }

      if (token) {
        await handlePayment(token.id);
      } else {
        throw new Error('Token creation failed.');
      }
    } catch (error) {
      console.error(error);
      setPaymentError(error.message || 'An error occurred during payment.');
      setPaymentSuccess(null);
    }
  };

  const handlePayment = async (tokenId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/payment', {
        token: tokenId,
        amount: productPrice * 100 // Stripe expects the amount in cents
      });

      if (response.data.success) {
        setPaymentSuccess('Payment successful!');
        setPaymentError(null);
      } else {
        setPaymentError('Payment failed. Please try again.');
        setPaymentSuccess(null);
      }
    } catch (error) {
      console.error(error);
      setPaymentError('An error occurred while processing your payment.');
      setPaymentSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CardElement options={cardElementOptions} />
      <div style={styles.price}>Price: ${productPrice}</div>
      <button
        type="submit"
        style={stripe ? styles.submitButton : { ...styles.submitButton, ...styles.disabledButton }}
        disabled={!stripe}
      >
        Pay
      </button>
      {paymentError && <div style={styles.error}>{paymentError}</div>}
      {paymentSuccess && <div style={styles.success}>{paymentSuccess}</div>}
    </form>
  );
};

export default CheckoutForm;

const styles = {
  form: { width: '400px', margin: 'auto' },
  submitButton: { marginTop: '16px', padding: '10px 15px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' },
  disabledButton: { backgroundColor: '#b3b3b3', cursor: 'not-allowed' },
  error: { color: 'red', marginTop: '8px' },
  success: { color: 'green', marginTop: '8px' },
  price: { fontSize: '18px', marginTop: '16px' }
};

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};
