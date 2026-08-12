import express from "express";
import {
  getPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "video", maxCount: 1 },
]);

router.get("/", getPortfolio);
router.get("/:id", getPortfolioById);
router.post("/", protect, uploadFields, createPortfolio);
router.put("/:id", protect, uploadFields, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

export default router;