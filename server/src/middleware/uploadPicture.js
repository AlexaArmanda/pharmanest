const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./profile-pictures/", 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/; // No PDFs here
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    return cb(null, true);
  }
  cb(new Error("Only JPEG, JPG, PNG images are allowed!"));
};


module.exports = uploadPicture;
