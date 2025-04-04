const express = require("express");
const router = express.Router();
const { getProductReviews, addReview, getUserReviews} = require("../controllers/reviewController");

router.get("/:id", getProductReviews);
router.post("/:id", addReview);
router.get("/user/:userID", getUserReviews);




module.exports = router;
