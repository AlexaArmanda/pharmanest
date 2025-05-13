const express = require("express");
const router = express.Router();
const { getProducts, getProductById, searchProducts,getBrands, getProductsByCategory, getFilteredProductsByCategory, getFeaturedProducts, getNewProducts, getSaleProducts, getClearanceProducts, getBestSellers} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/new", getNewProducts);
router.get("/sale", getSaleProducts);
router.get("/clearance", getClearanceProducts);

router.get("/best-sellers", getBestSellers);

router.get("/search", searchProducts);
router.get('/brands', getBrands);

router.get("/featured/:featuredID", getFeaturedProducts);

router.get("/category/:categoryId", getProductsByCategory);
router.get('/category/:id/filtered/:filters', getFilteredProductsByCategory);

router.get("/:id", getProductById);


module.exports = router;
