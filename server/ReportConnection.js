const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Report = require("./Models/Reports");  // Assuming you have a Report model

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

// Create a new report
app.post("/reports", async (req, res) => {
    try {
        const report = new Report(req.body);
        const result = await report.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to create report", error });
    }
});

// Read all reports
app.get("/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send({ message: "Failed to retrieve reports", error });
    }
});

// Update a report
app.put("/reports/:id", async (req, res) => {
    try {
        const result = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to update report", error });
    }
});

// Delete a report
app.delete("/reports/:id", async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: "Failed to delete report", error });
    }
});

// Start server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
