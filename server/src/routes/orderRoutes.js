const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/orderController");

// Define the POST route for placing an order
router.post("/", placeOrder);

module.exports = router;
