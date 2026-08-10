import connectDB from "../src/config/db.js";
import app from "../src/app.js";

let dbPromise;

export default async function handler(req, res) {
  try {
    if (!dbPromise) {
      dbPromise = connectDB();
    }
    await dbPromise;
    return app(req, res);
  } catch (error) {
    console.error("Vercel API initialization error:", error);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
}
