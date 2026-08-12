import mongoose from "mongoose";
import Portfolio from "../models/Portfolio.js";
import Service from "../models/Service.js";

function getUploadedUrls(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value.filter(Boolean);

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

// @route GET /api/portfolio
// @access Public
export const getPortfolio = async (req, res) => {
  try {
    const filter = {};

    if (req.query.service) {
      if (mongoose.Types.ObjectId.isValid(req.query.service)) {
        filter.service = req.query.service;
      } else {
        const serviceDoc = await Service.findOne({
          slug: req.query.service,
        });

        if (!serviceDoc) {
          return res.json({
            success: true,
            count: 0,
            data: [],
          });
        }

        filter.service = serviceDoc._id;
      }
    }

    const projects = await Portfolio.find(filter)
      .populate("service", "title slug")
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("GET PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to load portfolio",
    });
  }
};

// @route GET /api/portfolio/:id
// @access Public
export const getPortfolioById = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id).populate(
      "service",
      "title slug"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("GET PORTFOLIO BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to load project",
    });
  }
};

// @route POST /api/portfolio
// @access Private
export const createPortfolio = async (req, res) => {
  try {
    const { title, description, service, client, link, order, videoUrl, imageUrls } = req.body;

    if (!title || !description || !service) {
      return res.status(400).json({
        success: false,
        message: "Title, description and service are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(service)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service id",
      });
    }

    const serviceExists = await Service.findById(service);

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "Selected service does not exist",
      });
    }

    const images = req.files?.images?.length
      ? req.files.images.map((file) => file.path)
      : getUploadedUrls(imageUrls);

    const video = videoUrl || req.files?.video?.[0]?.path || "";

    const project = await Portfolio.create({
      title,
      description,
      service,
      client: client || "",
      link: link || "",
      order: Number(order) || 0,
      images,
      video,
    });

    const populated = await project.populate("service", "title slug");

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: populated,
    });
  } catch (error) {
    console.error("CREATE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create project",
    });
  }
};

// @route PUT /api/portfolio/:id
// @access Private
export const updatePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const { title, description, service, client, link, order, videoUrl, imageUrls } = req.body;

    if (service !== undefined && service !== "") {
      if (!mongoose.Types.ObjectId.isValid(service)) {
        return res.status(400).json({
          success: false,
          message: "Invalid service id",
        });
      }

      const serviceExists = await Service.findById(service);

      if (!serviceExists) {
        return res.status(404).json({
          success: false,
          message: "Selected service does not exist",
        });
      }

      project.service = service;
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (client !== undefined) project.client = client;
    if (link !== undefined) project.link = link;

    if (order !== undefined) {
      project.order = Number(order) || 0;
    }

    // Replace images only when new images are uploaded
    if (req.files?.images?.length > 0) {
      project.images = req.files.images.map((file) => file.path);
    } else {
      const uploadedImages = getUploadedUrls(imageUrls);
      if (uploadedImages.length > 0) project.images = uploadedImages;
    }

    // Replace video only when a new video is uploaded
    if (videoUrl) {
      project.video = videoUrl;
    } else if (req.files?.video?.[0]?.path) {
      project.video = req.files.video[0].path;
    }

    await project.save();

    const populated = await project.populate("service", "title slug");

    res.json({
      success: true,
      message: "Project updated successfully",
      data: populated,
    });
  } catch (error) {
    console.error("UPDATE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update project",
    });
  }
};

// @route DELETE /api/portfolio/:id
// @access Private
export const deletePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete project",
    });
  }
};
