const express = require("express");
const router = express.Router();
const { getCartProducts } = require("../controllers/cartController");

router.get("/", getCartProducts);

module.exports = router;
