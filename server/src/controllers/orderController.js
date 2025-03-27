const { createOrder } = require("../models/OrderModel");

const placeOrder = async (req, res) => {
  try {
    const { userId, cartItems, shippingAddress, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty!" });
    }

    const order = await createOrder(userId, cartItems, shippingAddress, paymentMethod);

    res.status(201).json(order);
  } catch (error) {
    console.error("Order placement failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { placeOrder };
