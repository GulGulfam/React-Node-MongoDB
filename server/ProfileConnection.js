const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Profile = require("./Models/Profile");

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb://127.0.0.1/youtube-video", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Fetch user profile data
app.get("/user/profile", async (req, res) => {
    try {
        // Fetch user by a specific identifier or criteria (e.g., by ID or email)
        const user = await User.findOne(); // Fetch first user for simplicity; adjust as needed
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch user profile", error });
    }
});

// Update user profile data
app.put("/user/profile", async (req, res) => {
    try {
        // Update user by a specific identifier or criteria (e.g., by ID or email)
        const user = await User.findOneAndUpdate({}, req.body, { new: true }); // Update first user for simplicity
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Failed to update user profile", error });
    }
});

// Start server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
