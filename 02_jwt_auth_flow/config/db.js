const mongoose = require("mongoose");

/**
 * @desc Connect to MongoDB
 * @returns {Promise<void>}
 * @async
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
