const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

// Register Route
router.post(
    "/register",
    [
      body("FullName").notEmpty().withMessage("Full name is required"),
      body("Email").isEmail().withMessage("Valid email is required"),
      body("Password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
      body('Phone').isMobilePhone('ro-RO', { strictMode: false }).withMessage('Valid phone number is required for Romania'), // Added phone number validation
      body("Address").notEmpty().withMessage("Address is required") // Added address validation
    ],
    registerUser
  );
  

// Login Route
router.post("/signIn", loginUser);


module.exports = router;
