const mongoose = require("mongoose");
const config = require("./config");

async function connectToDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection failed: ", err);
  }
}

module.exports = connectToDB