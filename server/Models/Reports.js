// Models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name: String,
    disease: String,
    level: String,
    symptomsDate: Date
});

module.exports = mongoose.model("Reports", reportSchema);
