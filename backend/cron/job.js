const cron = require("node-cron");
const { computeStats } = require("../utils/statistics");
const QueryStats = require("../models/QueryStats");

const scheduleStatsJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("[CRON] Updating stats...");
    const stats = await computeStats();

    await QueryStats.create(stats);
  });
};

module.exports = { scheduleStatsJob };
