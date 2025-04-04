const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post(
    "/register",
    [
      body("FullName").notEmpty().withMessage("Full name is required"),
      body("Email").isEmail().withMessage("Valid email is required"),
      body("Password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
      body('Phone').isMobilePhone('ro-RO', { strictMode: false }).withMessage('Valid phone number is required for Romania'), 
      body("Address").notEmpty().withMessage("Address is required")
    ],
    registerUser
  );
  

router.post("/signIn", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
