const express = require("express");
const TimeLog = require("../models/TimeLog");
const router = express.Router();

// Log website usage
router.post("/log-time", async (req, res) => {
    try {
        const { url, category, duration } = req.body;
        const log = new TimeLog({ url, category, duration });
        await log.save();
        res.status(200).json({ message: "Time logged successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch weekly report
router.get("/weekly-report", async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const report = await TimeLog.aggregate([
            { $match: { date: { $gte: oneWeekAgo } } },
            { $group: { _id: "$category", totalTime: { $sum: "$duration" } } }
        ]);

        res.status(200).json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
