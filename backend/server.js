const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/userModels");

const cors = require("cors");

const userRoute = require("./routes/userroutes");

//Creating an instance of an Express application
const app = express();
app.use(cors());

app.use(express.json());
//Importing Mongoose to interact with MongoDB
const mongoose = require("mongoose");

//Attempting to connect to MongoDB using URI stored in the environment variable.
mongoose.connect(process.env.URI).then(() => {
  console.log("Connected successfully to MongoDB.");
  //Starting the server on the specified port or defaulting to 8000
  // if the Port evironment  is not set.
  app.listen(process.env.PORT || 8000, (error) => {
    if (error) console.error(error);
    console.log("Server running successfully at ${process.env.PORT}");
  });
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.use(userRoute)