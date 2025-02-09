const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const getReportRoutes = require("./routes/getReportRoutes");
const tableRoutes = require("./routes/tableRoutes");
const columnRoutes = require("./routes/columnRoutes");
const rowRoutes = require("./routes/rowRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/getReports", getReportRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/rows", rowRoutes);

module.exports = app;
