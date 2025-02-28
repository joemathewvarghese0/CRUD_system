const express = require("express");
const User = require("../models/userModel");
const mongoose = require("mongoose");

//create new router object
const router = express.Router();

//define a POST route handler for createing a new user
router.post("/",async (req,res) => {
 console.log(req.body)
    const{name, email, age} = req.body;

    try{

        const userAdded = await User.create({
            name : name,
            email: email,
            age: age
        });

        res.status(201).json(userAdded);
    }catch (error) {
        
        res.status(400).json({ Error: error.message });

        
    }
});
//define a GET route handler for retrieving all users
router.get("/", async (req, res) => {
    try{
        const showAll = await User.find();

        res.status(201).json(showAll);
    }catch (error) {
        console.error(error);
        console.log("An error occured:", error.message);
        res.status(400).json({ error: error.message });
    }
});

//define a GET route handler for retrieving a single user by id
router.get("/:id", async (req, res) => {
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
router.delete("/:id", async(req, res) => {

    const{ id } = req.params;
    try {
        const showAll = await User.findById({_id: id});

        const deletedUser = await User.findByIdAndDelete(id);

        res.status(201).json(showAll);
    }catch (error) {
         res.status(400).json({ error: error.message });
    }
});

router.patch("/:id", async (req, res) => {

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
