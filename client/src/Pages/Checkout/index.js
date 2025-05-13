import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const Checkout = ({ userId, cartItems = [] }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiration, setExpiration] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [deliveryMethod, setDeliveryMethod] = useState("Standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const { cart, totalAmount } = location.state || { cart: [], totalAmount: 0 };
  const navigate = useNavigate();

  const calculateTotalAmount = (cartItems) => {
    return (cartItems || []).reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  useEffect(() => {
    console.log("Cart Items:", cart);
    console.log("Total Amount:", totalAmount);
  }, [cart, totalAmount]);
  
  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signIn");
      return;
    }

    const orderData = {
      userId: userId || null,
      shippingAddress: address,
      paymentMethod,
      deliveryMethod,
      cartItems: cart,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/placeOrder",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
      navigate("/order-confirmation");
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item, index) => (
            <p key={index}>
              {item.name} x{item.quantity} - ${item.price.toFixed(2)} each
            </p>
          ))}
          <h3 className="total-amount">Total: ${totalAmount.toFixed(2)}</h3>
        </div>

        <div className="shipping-info">
          <h3>Shipping Information</h3>
          <div className="input-group">
            <label htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="payment-info">
          <h3>Payment Information</h3>
          <div className="input-group">
            <label>Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          {paymentMethod === "Credit Card" && (
            <>
              <div className="input-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="expiration">Expiration Date (MM/YY):</label>
                <input
                  id="expiration"
                  type="text"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  required
                />
              </div>
            </>
          )}
        </div>

        {/* Delivery Method */}
        <div className="delivery-method">
          <h3>Delivery Method</h3>
          <div className="input-group">
            <label>Delivery Method:</label>
            <select
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <option value="Standard">Standard Shipping</option>
              <option value="Express">Express Shipping</option>
            </select>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="place-order">
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="checkout-button"
        >
          {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
