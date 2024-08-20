const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Medicine = require('./Models/Medicine');  // Import the Medicine model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/youtube-video", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Fetch all medicines
app.get("/medicines", async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).send(medicines);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch medicines", error });
    }
});

// Search medicines
app.get("/medicines/search", async (req, res) => {
    try {
        const searchTerm = req.query.q || "";
        const medicines = await Medicine.find({
            name: { $regex: searchTerm, $options: 'i' }  // Case-insensitive search
        });
        res.status(200).send(medicines);
    } catch (error) {
        res.status(500).send({ message: "Failed to search medicines", error });
    }
});

// Start server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
