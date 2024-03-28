const express = require("express");
const Router = express.Router();
const User = require("../Modals/Usermodal");
const jwt = require('jsonwebtoken');

Router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        await User.create({
            username,
            email,
            password
        });

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


Router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid password." });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, "masai7", { expiresIn: "30s" });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


Router.get("/home", (req, res) => {
    res.send("Welcome to homepage");
});

module.exports = Router;
