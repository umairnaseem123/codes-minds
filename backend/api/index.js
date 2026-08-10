import dotenv from "dotenv";

import connectDB from "../src/config/db.js";
import app from "../src/app.js";

dotenv.config();

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("API startup error:", error);
    return res.status(500).json({
      success: false,
      message: "The API could not connect to its database.",
    });
  }
}
