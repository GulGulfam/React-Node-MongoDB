// Models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String // Add password field if necessary
});

module.exports = mongoose.model("Profile", userSchema);
