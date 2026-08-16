import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dns from "dns";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import Portfolio from "./src/models/Portfolio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../backend.env"),
});

dns.setServers(["8.8.8.8", "8.8.4.4"]);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadDir = path.join(__dirname, "uploads");

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  if (
    !process.env.CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error("Cloudinary environment variables are missing");
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

  const projects = await Portfolio.find({
    images: { $elemMatch: { $regex: "^/uploads/" } },
  }).select("_id title images");

  console.log(
    `Found ${projects.length} portfolio projects with local image paths.`
  );

  let uploadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const project of projects) {
    console.log(`\n${project.title}`);

    const newImages = [];

    for (const imagePath of project.images) {
      if (!imagePath.startsWith("/uploads/")) {
        newImages.push(imagePath);
        console.log(`  SKIP: ${imagePath}`);
        continue;
      }

      const filename = path.basename(imagePath);
      const localPath = path.join(uploadDir, filename);

      if (!fs.existsSync(localPath)) {
        console.log(`  MISSING LOCAL FILE: ${filename}`);
        newImages.push(imagePath);
        skippedCount++;
        continue;
      }

      try {
        console.log(`  UPLOADING: ${filename}`);

        const result = await cloudinary.uploader.upload(localPath, {
          folder: "codes-minds/portfolio",
          resource_type: "image",
        });

        console.log(`  CLOUDINARY URL: ${result.secure_url}`);

        newImages.push(result.secure_url);
        uploadedCount++;
      } catch (error) {
        console.error(`  UPLOAD FAILED: ${filename}`);
        console.error(`  ${error.message}`);

        newImages.push(imagePath);
        failedCount++;
      }
    }

    await Portfolio.updateOne(
      { _id: project._id },
      { $set: { images: newImages } }
    );

    console.log(`  DATABASE UPDATED: ${project._id}`);
  }

  console.log("\n=================================");
  console.log("MIGRATION COMPLETE");
  console.log("=================================");
  console.log(`Uploaded: ${uploadedCount}`);
  console.log(`Skipped:  ${skippedCount}`);
  console.log(`Failed:   ${failedCount}`);

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("\nERROR:", error.message);

  try {
    await mongoose.disconnect();
  } catch {}

  process.exit(1);
});