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

// const uploadProfilePicture = async (req, res) => {
//   try {
//     const userId = req.user?.UserID; // From auth middleware (JWT parsed)
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     if (!userId) {
//       return res.status(400).json({ message: "Missing User ID" });
//     }

//     const profilePicPath = `/profile-pictures/${req.file.filename}`;

//     await db
//       .request()
//       .input("UserID", sql.Int, userId)
//       .input("ProfilePictureURL", sql.VarChar(255), profilePicPath)
//       .query("UPDATE Users SET ProfilePictureURL = @ProfilePictureURL WHERE UserID = @UserID");

//     res.status(200).json({ message: "Profile picture uploaded successfully", url: profilePicPath });
//   } catch (error) {
//     console.error("Profile picture upload error:", error);
//     res.status(500).json({ message: "Server error: " + error.message });
//   }
// };


module.exports = { uploadPrescription };
