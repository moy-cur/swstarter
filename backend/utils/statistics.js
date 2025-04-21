const SearchLog = require("../models/SearchLog");

const computeStats = async () => {
  const logs = await SearchLog.aggregate([
    {
      $facet: {
        topQueries: [
          { $group: { _id: "$query", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
          {
            $project: {
              query: "$_id",
              count: 1,
              _id: 0,
            },
          },
        ],
        avgResponseTime: [
          {
            $group: {
              _id: null,
              avgTime: { $avg: "$responseTimeMs" },
            },
          },
        ],
        popularHour: [
          {
            $project: {
              hour: { $hour: "$timestamp" },
            },
          },
          {
            $group: {
              _id: "$hour",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 1 },
          {
            $project: {
              hour: "$_id",
              count: 1,
              _id: 0,
            },
          },
        ],
      },
    },
  ]);

  const { topQueries, avgResponseTime, popularHour } = logs[0];

  const totalQueries = topQueries.reduce((acc, item) => acc + item.count, 0);
  const topQueriesWithPercentages = topQueries.map((item) => ({
    query: item.query,
    percentage: ((item.count / totalQueries) * 100).toFixed(2) + "%",
  }));

  return {
    topQueries: topQueriesWithPercentages,
    avgResponseTime: avgResponseTime[0]?.avgTime || 0,
    mostPopularHour: popularHour[0]?.hour ?? null,
  };
};

module.exports = { computeStats };
