import app from "../backend/src/app.js";
import connectDB from "../backend/src/config/db.js";

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
  // CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  // CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Health check does NOT need MongoDB
  if (req.url?.startsWith("/api/health")) {
    return res.status(200).json({
      status: "ok",
      message: "Codes Minds API is running",
    });
  }

  try {
    await connectToDatabase();

    return app(req, res);
  } catch (error) {
    console.error("Vercel API Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
