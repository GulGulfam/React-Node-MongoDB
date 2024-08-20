const mongoose = require('mongoose');

// Define schema
const medicineSchema = new mongoose.Schema({
    name: String,
    description: String,
}, { collection: 'medicines' });  // Explicitly set the collection name

// Create model
module.exports = mongoose.model('Medicine', medicineSchema);
