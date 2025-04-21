const mongoose = require("mongoose");

const searchLogSchema = new mongoose.Schema({
  query: { type: String, required: true },
  type: { type: String, enum: ["people", "films"], required: true },
  responseTimeMs: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SearchLog", searchLogSchema);
