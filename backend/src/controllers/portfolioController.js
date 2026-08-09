import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Portfolio from "../models/Portfolio.js";
import Service from "../models/Service.js";

const removeUploadedFiles = (paths) => {
  if (!paths || paths.length === 0) return;
  paths.forEach((p) => {
    if (!p) return;
    const filePath = path.join(process.cwd(), p.replace(/^\//, ""));
    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT")
        console.error("File delete error:", err.message);
    });
  });
};

export const getPortfolio = async (req, res) => {
  try {
    const filter = {};

    if (req.query.service) {
      if (mongoose.Types.ObjectId.isValid(req.query.service)) {
        filter.service = req.query.service;
      } else {
        const serviceDoc = await Service.findOne({ slug: req.query.service });
        if (!serviceDoc) {
          return res.json({ success: true, count: 0, data: [] });
        }
        filter.service = serviceDoc._id;
      }
    }

    const projects = await Portfolio.find(filter)
      .populate("service", "title slug")
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPortfolioById = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id).populate(
      "service",
      "title slug",
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/portfolio
// Files: images (multiple, field "images"), video (single, field "video")
export const createPortfolio = async (req, res) => {
  try {
    const { title, description, service, client, link, order } = req.body;

    if (!title || !description || !service) {
      return res.status(400).json({
        success: false,
        message: "Title, description and service are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(service)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid service id" });
    }

    const serviceExists = await Service.findById(service);
    if (!serviceExists) {
      return res
        .status(404)
        .json({ success: false, message: "Selected service does not exist" });
    }

    const images = req.files?.images
      ? req.files.images.map((file) => `/uploads/${file.filename}`)
      : [];

    const video = req.files?.video?.[0]
      ? `/uploads/${req.files.video[0].filename}`
      : "";

    const project = await Portfolio.create({
      title,
      description,
      service,
      client,
      link,
      order,
      images,
      video,
    });

    const populated = await project.populate("service", "title slug");

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/portfolio/:id
export const updatePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const { title, description, service, client, link, order } = req.body;

    if (service !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(service)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid service id" });
      }
      const serviceExists = await Service.findById(service);
      if (!serviceExists) {
        return res
          .status(404)
          .json({ success: false, message: "Selected service does not exist" });
      }
      project.service = service;
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (client !== undefined) project.client = client;
    if (link !== undefined) project.link = link;
    if (order !== undefined) project.order = order;

    if (req.files?.images && req.files.images.length > 0) {
      removeUploadedFiles(project.images);
      project.images = req.files.images.map(
        (file) => `/uploads/${file.filename}`,
      );
    }

    if (req.files?.video?.[0]) {
      removeUploadedFiles([project.video]);
      project.video = `/uploads/${req.files.video[0].filename}`;
    }

    await project.save();
    const populated = await project.populate("service", "title slug");
    res.json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    removeUploadedFiles([...project.images, project.video]);
    await project.deleteOne();

    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
