import path from "path";
import fs from "fs";
import multer from "multer";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const imageTypes = /jpeg|jpg|png|webp|gif/;
const videoTypes = /mp4|mov|webm|avi|mkv/;

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "video") {
    const extValid = videoTypes.test(ext);
    const mimeValid = /^video\//.test(file.mimetype);
    if (extValid && mimeValid) return cb(null, true);
    return cb(
      new Error("Only video files (mp4, mov, webm, avi, mkv) are allowed")
    );
  }

  const extValid = imageTypes.test(ext);
  const mimeValid = imageTypes.test(file.mimetype);
  if (extValid && mimeValid) return cb(null, true);
  return cb(new Error("Only image files (jpg, jpeg, png, webp, gif) are allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB — video ke liye kaafi hai
});

export default upload;