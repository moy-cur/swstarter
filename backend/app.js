const { connectDB } = require("./db/connection.js");
const express = require("express");
require("dotenv").config();
const { scheduleStatsJob } = require("./cron/job");

scheduleStatsJob();

const bodyParser = require("body-parser");
const cors = require("cors");

const starwarsRoutes = require("./routes/starwars");
const statsController = require("./controllers/stats.js");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/starwars", starwarsRoutes);

app.use("/api/stats", statsController.getStats);

const startServer = async () => {
  await connectDB();
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
};

startServer();
