const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const getReportRoutes = require("./routes/getReportRoutes");
const stockpickRoutes = require("./routes/stockpickRoutes");
const stockRoutes = require("./routes/stockRoutes");
const vnindexpickRoutes = require("./routes/vnindexpickRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/getReports", getReportRoutes);
app.use("/api/stockpicks", stockpickRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/vnindexpicks", vnindexpickRoutes);

module.exports = app;
