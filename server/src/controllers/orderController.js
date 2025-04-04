const { createOrder, getUserOrdersFromDB } = require("../models/OrderModel");

const placeOrder = async (req, res) => {
  try {
    const { cartItems, shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id;
    console.log("UserID from JWT:", userId);
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

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching orders for UserID:", userId);

    const orders = await getUserOrdersFromDB(userId);
    console.log("Orders fetched:", orders); 

    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    res.status(500).json({ error: "Could not retrieve orders" });
  }
};


module.exports = { placeOrder, getUserOrders };
