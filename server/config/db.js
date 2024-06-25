const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_LIVE_URI);
    console.log(
      `MongoDB connected: ${conn.connection.host}:${conn.connection.port}`.cyan
        .underline.bold
    );
  } catch (err) {
    console.log(`${err.message}`.red);
  }
};

module.exports = connectDB;
