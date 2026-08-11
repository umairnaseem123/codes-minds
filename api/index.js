import dotenv from "dotenv";
dotenv.config();

import connectDB from "../backend/src/config/db.js";
import app from "../backend/src/app.js";

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const conn = await connectDB();
  cachedDb = conn;

  return conn;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error("API Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
