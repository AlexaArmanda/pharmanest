const express = require("express");
const router = express.Router();
const { getProducts, getProductById, searchProducts, getProductsByCategory } = require("../controllers/productController");

// ✅ Get all products
router.get("/", getProducts);

// ✅ Search products
router.get("/search", searchProducts);

// ✅ Get products by category (placed BEFORE /:id to avoid conflicts)
router.get("/category/:categoryId", getProductsByCategory);

// ✅ Get a single product by ID
router.get("/:id", getProductById);

module.exports = router;
