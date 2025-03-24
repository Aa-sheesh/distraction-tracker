const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  categories: {
    type: Map,
    of: String,
    default: {},
  },
});

module.exports = mongoose.model("Settings", settingsSchema);
