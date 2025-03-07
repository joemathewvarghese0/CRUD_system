const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
const User = require("./models/userModel");

const cors = require("cors");

const userRoute = require("./routes/userroutes");

//Creating an instance of an Express application
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"], //only allows requests from React frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", userRoute);

if(!process.env.URI){
  console.error("MongoDB URI is missing in .env file");
  process.exit(1);
}

//Importing Mongoose to interact with MongoDB
const mongoose = require("mongoose");

//Attempting to connect to MongoDB using URI stored in the environment variable.
mongoose.connect(process.env.URI).then(() => {
  console.log("Connected successfully to MongoDB.");
  //Starting the server on the specified port or defaulting to 8000
  // if the Port evironment  is not set.
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running successfully at ${process.env.PORT || 8000}`);
  });
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});


const authenticateToken = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({message: "access denied"});

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token"});
    req.user = user;
    next();
  });
};

app.use("/api/users", authenticateToken, userRoute);

app.use((err,req,res,next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error"});
});