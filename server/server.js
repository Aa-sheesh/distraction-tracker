// Existing requires...
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin:'*'
}));

connectDB();

// Existing routes
app.use("/api", require("./routes/timeLogRoutes"));

// New route for categories
app.use("/api", require("./routes/categoryRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
