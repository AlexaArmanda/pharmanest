const { insertPrescription } = require("../models/prescriptionModel");

const uploadPrescription = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { UserID } = req.body;
    
    if (!UserID) {
      return res.status(400).json({ message: "UserID is required" });
    }

    const filePath = `/uploads/${req.file.filename}`;
    await insertPrescription(UserID, filePath);

    res.status(201).json({ message: "Prescription uploaded successfully!", filePath });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


module.exports = { uploadPrescription };
