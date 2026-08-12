import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { protect } from "../middleware/auth.js";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/signature", protect, (req, res) => {
  const resourceType = req.body?.resourceType === "video" ? "video" : "image";

  if (!process.env.CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({
      success: false,
      message: "Cloudinary is not configured on the server.",
    });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "codes-minds";
  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    process.env.CLOUDINARY_API_SECRET,
  );

  return res.json({
    success: true,
    data: {
      cloudName: process.env.CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
      resourceType,
      signature,
      timestamp,
    },
  });
});

export default router;
