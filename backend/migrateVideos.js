import dotenv from "dotenv";
import dns from "dns";

dotenv.config({
  path: "../backend.env",
});
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Portfolio from "./src/models/Portfolio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrateVideos() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    const projects = await Portfolio.find({
      video: { $regex: "^/uploads/" },
    });

    console.log(`Found ${projects.length} old videos`);

    for (const project of projects) {
      const fileName = path.basename(project.video);

      const localPath = path.join(__dirname, "uploads", fileName);

      console.log("\n-----------------------------");
      console.log(`Project: ${project.title}`);
      console.log(`Video: ${fileName}`);

      if (!fs.existsSync(localPath)) {
        console.log("❌ File not found locally:", localPath);
        continue;
      }

      console.log("Uploading to Cloudinary...");

      const result = await cloudinary.uploader.upload(localPath, {
        resource_type: "video",
        folder: "codes-minds/portfolio",
      });

      console.log("✅ Uploaded:", result.secure_url);

      project.video = result.secure_url;

      await project.save();

      console.log("💾 MongoDB updated");
    }

    console.log("\n🎉 VIDEO MIGRATION COMPLETED!");

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("❌ MIGRATION ERROR:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

migrateVideos();
