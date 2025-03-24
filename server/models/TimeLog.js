const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema({
    url: String,
    category: String, // "productive" or "distracting"
    duration: Number, // Time in seconds
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TimeLog", timeLogSchema);
