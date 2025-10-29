require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
async function connectDB() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully to 'knowledge-hub' database!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process on failure
  }
}

module.exports = connectDB;
