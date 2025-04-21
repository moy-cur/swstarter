const SearchLogModel = require("../models/SearchLog");

exports.saveStat = async (stat) => {
  try {
    await SearchLogModel.create(stat);
  } catch (error) {
    console.log(error);
  }
};
