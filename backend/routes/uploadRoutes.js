const express = require("express");
const multer = require("multer");
const path = require("path");

//create new router object
const router = express.Router();

const uploads = multer({ dest: "uploads/" });

//set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Upload image
router.post("/", uploads.single("profilePic"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ filename: req.file.filename });
  });
  
  module.exports = router;