import express from "express";
import {
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/teamController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getTeam);
router.post("/", protect, upload.single("image"), createTeam);
router.put("/:id", protect, upload.single("image"), updateTeam);
router.delete("/:id", protect, deleteTeam);

export default router;
