const express = require("express");
const router = express.Router();
const { getProducts, getProductById, searchProducts,getBrands, getProductsByCategory, getFilteredProductsByCategory} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/search", searchProducts);
router.get('/brands', getBrands);
router.get("/category/:categoryId", getProductsByCategory);
router.get('/category/:id/filtered/:filters', getFilteredProductsByCategory);

router.get("/:id", getProductById);



module.exports = router;
