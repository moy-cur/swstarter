const QueryStats = require("../models/QueryStats");

exports.getStats = async (req, res, next) => {
  const latestStats = await QueryStats.findOne().sort({ createdAt: -1 });

  if (!latestStats) {
    return res.status(503).json({ message: "Stats not ready" });
  }

  res.json(latestStats);
};
