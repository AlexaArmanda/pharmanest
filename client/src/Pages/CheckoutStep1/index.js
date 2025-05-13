import React from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

const CheckoutStep1 = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Enter Your Personal Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField name="name" label="Full Name" fullWidth required value={formData.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="email" label="Email" fullWidth required value={formData.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="phone" label="Phone Number" fullWidth required value={formData.phone} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="address" label="Address" fullWidth required value={formData.address} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="country" label="Country" fullWidth required value={formData.country} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="zip" label="ZIP / Postal Code" fullWidth required value={formData.zip} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={nextStep} fullWidth>
            Continue to Payment
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutStep1;