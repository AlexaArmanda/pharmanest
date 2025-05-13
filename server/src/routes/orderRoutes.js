const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { placeOrder, getUserOrders, getTotalSpent} = require("../controllers/orderController");


router.post("/placeOrder", authMiddleware, placeOrder);
router.get("/history", authMiddleware, getUserOrders);
router.get("/totalSpent", authMiddleware, getTotalSpent);

module.exports = router;
