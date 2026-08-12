import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Codes Minds API is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/uploads", uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
  });
});

export default app;
