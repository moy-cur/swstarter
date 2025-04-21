const mongoose = require("mongoose");

const MONGO_URI = process.env.DB_CONN || "mongodb://localhost:27017/swstarter";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("database connected");
  } catch (err) {
    console.error("db connection error:", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
