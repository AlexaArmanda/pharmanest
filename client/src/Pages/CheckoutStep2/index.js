import React from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const paymentOptions = ["Credit Card", "PayPal", "Cash on Delivery (Ramburs)"];

const CheckoutStep2 = ({ formData, setFormData, handleSubmit, prevStep }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Choose Payment Method & Extras
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            label="Payment Method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            fullWidth
            required
          >
            {paymentOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="extraSafety" checked={formData.extraSafety} onChange={handleCheckbox} />}
            label="Extra Safety for Package"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="sustainablePackaging" checked={formData.sustainablePackaging} onChange={handleCheckbox} />}
            label="Sustainable Packaging"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="fasterDelivery" checked={formData.fasterDelivery} onChange={handleCheckbox} />}
            label="Faster Delivery"
          />
        </Grid>

        <Grid item xs={6}>
          <Button variant="outlined" onClick={prevStep} fullWidth>
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Confirm Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutStep2;