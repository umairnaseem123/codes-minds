import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "codes-minds",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "webm"],
  },
});

const upload = multer({ storage });

export default upload;
