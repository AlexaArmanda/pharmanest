const { sql, poolPromise } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const JWT_SECRET = "my_pharmanest_key";

const registerUser = async (req, res) => {
  const { FullName, Email, Password, Phone, Address} = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pool = await poolPromise;

    const existingUser = await pool
      .request()
      .input("Email", sql.NVarChar, Email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

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

const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("Email", sql.NVarChar, Email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];
    console.log("Stored Hash:", user.PasswordHash);
    console.log("Input Password:", Password);
    const isMatch = await bcrypt.compare(Password, user.PasswordHash);     
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.UserID },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        UserID: user.UserID,
        FullName: user.FullName,
        Email: user.Email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
      const userId = req.user.id;

      const pool = await poolPromise;
      const result = await pool
          .request()
          .input("UserID", sql.Int, userId)
          .query("SELECT UserID, FullName as Name, Email FROM Users WHERE UserID = @UserID");

      if (result.recordset.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(result.recordset[0]);
  } catch (error) {
      console.error("Error fetching user profile:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = { registerUser, loginUser, getUserProfile };
