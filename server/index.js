const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

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

// Import Models
const User = require("./Models/User");
const Report = require("./Models/Reports");
const Medicine = require("./Models/Medicine");

// User Routes
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to save user", error });
    }
});

// Report Routes
app.post("/reports", async (req, res) => {
    try {
        const report = new Report(req.body);
        const result = await report.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to create report", error });
    }
});

app.get("/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send({ message: "Failed to retrieve reports", error });
    }
});

app.put("/reports/:id", async (req, res) => {
    try {
        const result = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to update report", error });
    }
});

app.delete("/reports/:id", async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: "Failed to delete report", error });
    }
});

// Medicine Routes
app.get("/medicines", async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).send(medicines);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch medicines", error });
    }
});

app.get("/medicines/search", async (req, res) => {
    try {
        const searchTerm = req.query.q || "";
        const medicines = await Medicine.find({
            name: { $regex: searchTerm, $options: 'i' }
        });
        res.status(200).send(medicines);
    } catch (error) {
        res.status(500).send({ message: "Failed to search medicines", error });
    }
});

// // Profile Routes
// app.get("/user/profile", async (req, res) => {
//     try {
//         const user = await User.findOne(); // Fetch the first user
//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         res.status(200).send(user);
//     } catch (error) {
//         res.status(500).send({ message: "Failed to fetch user profile", error });
//     }
// });

// app.put("/user/profile", async (req, res) => {
//     try {
//         const user = await User.findOneAndUpdate({}, req.body, { new: true }); // Update the first user
//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         res.status(200).send(user);
//     } catch (error) {
//         res.status(500).send({ message: "Failed to update user profile", error });
//     }
// });

app.get("/user/profile",  async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch user profile", error });
    }
});

app.put("/user/profile",async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Failed to update user profile", error });
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
