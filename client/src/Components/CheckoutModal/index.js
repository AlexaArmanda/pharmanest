import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
  "Credit Card",
  "PayPal",
  "Apple Pay",
  "Cash on Delivery",
];

const CheckoutModal = ({
  open,
  onClose,
  totalAmount,
  cartItems,
  userId,
  handleCheckoutSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    country: "",
    zip: "",
    paymentMethod: "Credit Card",
    cardNumber: "",
    cvv: "",
    expiration: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      cartItems,
      totalAmount,
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
      handleCheckoutSuccess({
        orderId: response.data.orderId,
        shippingAddress: formData.address,
        totalAmount,
        name: formData.name,
      });
      onClose();
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Stack spacing={2} direction="column">
          {step === 1 && (
            <>
              <Typography variant="h6" mb={2} textAlign="center">
                Checkout - Enter Personal Information
              </Typography>

              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="ZIP / Postal Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                fullWidth
                required
              />
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h6" mb={2} textAlign="center">
                Checkout - Enter Payment Information
              </Typography>

              <TextField
                select
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                fullWidth
                required
              >
                {paymentMethods.map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </TextField>

              {formData.paymentMethod === "Credit Card" && (
                <>
                  <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    fullWidth
                    required
                    type="password"
                  />
                  <TextField
                    label="Expiration Date"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="MM/YY"
                  />
                </>
              )}

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Stack>

        <Box
          className="action-buttons"
          mt={3}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          {step === 2 && (
            <Button
              variant="outlined"
              onClick={() => setStep(1)}
              startIcon={<ArrowBackIosIcon />}
              className="back-btn"
            >
              Back
            </Button>
          )}
          {step === 1 && (
            <Button
              variant="contained"
              onClick={() => setStep(2)}
              endIcon={<ArrowForwardIosIcon />}
              className="next-btn"
            >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CheckoutModal;
