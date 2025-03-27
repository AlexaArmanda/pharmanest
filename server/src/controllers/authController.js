const { sql, poolPromise } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// JWT Secret Key
const JWT_SECRET = "my_pharmanest_key";

// User Registration
const registerUser = async (req, res) => {
  const { FullName, Email, Password, Phone, Address} = req.body;

  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pool = await poolPromise;

    // Check if user already exists
    const existingUser = await pool
      .request()
      .input("Email", sql.NVarChar, Email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Insert new user
    await pool
      .request()
      .input("FullName", sql.NVarChar, FullName)
      .input("Email", sql.NVarChar, Email)
      .input("PasswordHash", sql.NVarChar, hashedPassword)
      .input("Phone", sql.NVarChar, Phone)
      .input("Address", sql.NVarChar, Address)
      .query(
        "INSERT INTO Users (FullName, Email, PasswordHash, Phone, Address, CreatedAt) VALUES (@FullName, @Email, @PasswordHash, @Phone, @Address, GETDATE())"
      );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const pool = await poolPromise;

    // Check if user exists
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, Email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(Password, user.PasswordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { UserID: user.UserID },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        UserID: user.UserID,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        Address: user.Address,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { registerUser, loginUser };
