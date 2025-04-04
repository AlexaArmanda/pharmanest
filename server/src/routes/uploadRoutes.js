const express = require("express");
const router = express.Router();
const { uploadPrescription } = require("../controllers/uploadController");
const upload = require("../middleware/upload");


router.post("/upload-prescription", upload.single("prescription"), uploadPrescription);



module.exports = router;
