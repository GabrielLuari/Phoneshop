import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PavHqRq8Fhasp2j66DyY3lpIXjzJHuYNx97SKBnrYDge3QcktSrwS8RsuhSlM3JQXhs6wxoO8eecGljXZApyDHd00JqlAEBCJ');

const PaymentModal = ({ show, handleClose, productPrice }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Elements stripe={stripePromise}>
          <CheckoutForm productPrice={productPrice} />
        </Elements>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
