const express = require("express");
const Settings = require("../models/Settings");
const router = express.Router();

// GET current categories
router.get("/categories", async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = new Settings({ categories: {} });
      await settings.save();
    }
    res.status(200).json(Object.fromEntries(settings.categories));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST update categories mapping
router.post("/categories", async (req, res) => {
  try {
    const { categories } = req.body;
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = new Settings({ categories });
    } else {
      settings.categories = categories;
    }
    await settings.save();
    res.status(200).json(Object.fromEntries(settings.categories));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
