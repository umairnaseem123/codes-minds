import fs from "fs";
import path from "path";
import Service from "../models/Service.js";

// Remove an uploaded file from disk (used when replacing/deleting images)
const removeUploadedFile = (imagePath) => {
  if (!imagePath) return;
  const filePath = path.join(process.cwd(), imagePath.replace(/^\//, ""));
  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") console.error("File delete error:", err.message);
  });
};

// @route  GET /api/services
// @access Public
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/services/:slug
// @access Public
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/services
// @access Private (admin)
export const createService = async (req, res) => {
  try {
    const { title, description, icon, order } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Title and description are required" });
    }

    const service = await Service.create({
      title,
      description,
      icon,
      order,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/services/:id
// @access Private (admin)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    const { title, description, icon, order } = req.body;

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (icon !== undefined) service.icon = icon;
    if (order !== undefined) service.order = order;

    if (req.file) {
      removeUploadedFile(service.image);
      service.image = `/uploads/${req.file.filename}`;
    }

    await service.save();
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/services/:id
// @access Private (admin)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    removeUploadedFile(service.image);
    await service.deleteOne();

    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
