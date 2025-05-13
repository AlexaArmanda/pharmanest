const express = require("express");
const router = express.Router();
const { getProductReviews, addReview, getUserReviews, updateReview, deleteReview} = require("../controllers/reviewController");

router.get("/:id", getProductReviews);
router.post("/:id", addReview);
router.get("/user/:userID", getUserReviews);
router.put("/:reviewID", updateReview);   
router.delete("/:reviewID", deleteReview); 



module.exports = router;
