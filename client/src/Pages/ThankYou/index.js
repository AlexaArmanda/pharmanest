// ThankYou.js
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const { name, Address, totalAmount, orderNumber } = location.state || {};

  return (
    <section className="thank-you-section">
      <div className="container">
        <div className="thank-you-message">
          <FaCheckCircle className="success-icon" />
          <h2>Thank You for Your Purchase!</h2>
          <p>Your order has been successfully processed. You will receive a confirmation email shortly.</p>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-details">
            <p><strong>Order Number:</strong> #{orderNumber}</p>
            <p><strong>Shipping Address:</strong> {name}, {Address}</p>
            <p><strong>Total:</strong> ${totalAmount}</p>
          </div>
        </div>

        <div className="next-steps">
          <div >
            <Link to="/" className="btn btn-green">
              <Button>Go to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
