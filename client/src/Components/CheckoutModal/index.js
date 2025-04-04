import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const CheckoutModal = ({
  open,
  onClose,
  totalAmount,
  cartItems,
  userId,
  handleCheckoutSuccess,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiration, setExpiration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
      paymentMethod: "Credit Card",
      cartItems,
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

      handleCheckoutSuccess(response.data);

      onClose();
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="checkout-modal-title"
      aria-describedby="checkout-modal-description"
    >
      <Box className="modal-box">
        <Typography id="checkout-modal-title" variant="h6">
          Enter Payment Information
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
            required
            margin="normal"
            type="text"
          />
          <TextField
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            fullWidth
            required
            margin="normal"
            type="password"
          />
          <TextField
            label="Expiration Date"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            fullWidth
            required
            margin="normal"
            type="text"
          />
          {error && <Typography color="error">{error}</Typography>}
          <div className="modal-actions">
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CheckoutModal;
