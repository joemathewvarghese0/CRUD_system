const express = require("express");
const bcrypt = require("bcryptjs"); //for password hashing
const jwt = require("jsonwebtoken")// for authentication
const User = require("../models/userModel");
const multer = require("multer");
const path = require("path");

//create new router object
const router = express.Router();

//set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
}
});

const uploads = multer({ storage });

//register a new user
router.post("/register", uploads.single("profilePic"), async (req, res) => {

    console.log("Received Register Request:", req.body);
    console.log("Uploaded File:", req.file); //  Debugging
  
  
      const { name, email, password, age } = req.body;
      const profilePic = req.file ? req.file.filename : null;
  
      try{
          if (!name || !email || !password || !age) {
              return res.status(400).json({ message: "All fields are required" });
          }
          //checks if the user already exists
          const existingUser = await User.findOne({ email });
          if(existingUser) {
              return res.status(400).json({ message: "Email already registered"});
          }
  
          //Hash the password before saving
          const hashedPassword = await bcrypt.hash(password, 10);

          //profilepic url if file was uploaded
          const profilePic = req.file ? req.file.path : '';
  
          const userAdded = await User.create({
              name,
              email,
              password: hashedPassword,
              age,
              profilePic
          });
  
          console.log("User Registered:", userAdded);
  
          res.status(201).json({ message: "User registered successfully", userAdded });
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  });
  
  router.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  
  //login route
  router.post("/login", async (req, res) => {
      try {
      const{ email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: "Invalid email or password"})
      }
  
      if (!user.password) {
          return res.status(500).json({ message: "User password is missing in database" });
      }
  
  //compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password"});
  }
  
  //generate JWT token
  const token = jwt.sign({
      userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
  );
  
  const profilePicUrl = user.profilePic
  ? `https://localhost:5000/uploads/${user.profilePic}`: null;
  
  
  res.json({ message: "Login successful", token, 
      user:{
          name: user.name,
          email: user.email,
          profilePic: profilePicUrl,
      },
  });
  } catch (error) {
      console.error("Error in login route:", error);
      res.status(500).json({error: "Internal Server Error"});
  }
  });

  module.exports = router;