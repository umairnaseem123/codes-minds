import mongoose from "mongoose";
import dns from "dns";

// Vercel's serverless runtime can fail to resolve MongoDB Atlas SRV records
// with its default resolver. Use reliable public resolvers for this process.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not configured");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
