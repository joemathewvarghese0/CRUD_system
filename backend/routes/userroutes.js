const express = require("express");
const bcrypt = require("bcryptjs"); //for password hashing
const jwt = require("jsonwebtoken")// for authentication
const User = require("../models/userModel");
const mongoose = require("mongoose");

//create new router object
const router = express.Router();

//middleware for authentication
const authenticateToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(403).json({ message: "Access denied"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

//register a new user
router.post("/register", async (req, res) => {
    const { name, email, password, age } = req.body;

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

        const userAdded = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
        });

        res.status(201).json({ message: "User registered successfully", userAdded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//login route
router.post("/login", async (req, res) => {
    const{ email, password } = req.body;

    try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password"})
    }

    console.log("User found in database:", user);

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

res.json({ message: "Login successful", token });
} catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({error: "Internal Server Error"});
}
});

//define a GET route handler for retrieving all users
router.get("/", authenticateToken, async (req, res) => {
    try{
        const showAll = await User.find();

        res.status(201).json(showAll);
    }catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

//define a GET route handler for retrieving a single user by id
router.get("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json(user);
    }catch (error) {

        res.status(400).json({ error: error.message });
    }
});

//define a delete route handler for deleting a user by ID
router.delete("/:id", authenticateToken, async(req, res) => {

    const{ id } = req.params;
    try {
        const showAll = await User.findById({_id: id});

        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).json({ error: "User not found"});
        }
        res.status(201).json(showAll);
    }catch (error) {
         res.status(400).json({ error: error.message });
    }
});

//update user by id
router.patch("/:id", authenticateToken, async (req, res) => {

    const{ id } = req.params;

    const { name, email, age } = req.body;
    
    try{

        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.status(201).json(updateUser);
    }catch (error) {

        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
