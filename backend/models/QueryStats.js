const mongoose = require("mongoose");

const queryStatsSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  topQueries: [
    {
      query: String,
      percentage: String,
    },
  ],
  avgResponseTime: Number,
  mostPopularHour: Number,
});

module.exports = mongoose.model("QueryStats", queryStatsSchema);
