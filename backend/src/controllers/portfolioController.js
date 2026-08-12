import mongoose from "mongoose";
import Portfolio from "../models/Portfolio.js";
import Service from "../models/Service.js";

// ==========================================
// GET ALL PORTFOLIO PROJECTS
// ==========================================

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
      .sort({
        order: 1,
        createdAt: -1,
      });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE PORTFOLIO PROJECT
// ==========================================

export const getPortfolioById = async (req, res) => {
  try {
    const project = await Portfolio.findById(
      req.params.id
    ).populate("service", "title slug");

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE PORTFOLIO PROJECT
// ==========================================

export const createPortfolio = async (req, res) => {
  try {
    const {
      title,
      description,
      service,
      client,
      link,
      order,
      videoUrl,
    } = req.body;

    if (!title || !description || !service) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description and service are required",
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
        message:
          "Selected service does not exist",
      });
    }

    // ==========================================
    // IMAGES FROM BACKEND / CLOUDINARY
    // ==========================================

    const images = req.files?.images
      ? req.files.images.map((file) => file.path)
      : [];

    // ==========================================
    // VIDEO
    // Priority:
    // 1. Direct Cloudinary URL from frontend
    // 2. Traditional backend uploaded video
    // ==========================================

    let video = "";

    if (videoUrl) {
      video = videoUrl;
    } else if (req.files?.video?.[0]) {
      video = req.files.video[0].path;
    }

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

    const populated = await project.populate(
      "service",
      "title slug"
    );

    res.status(201).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    console.error("CREATE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE PORTFOLIO PROJECT
// ==========================================

export const updatePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const {
      title,
      description,
      service,
      client,
      link,
      order,
      videoUrl,
    } = req.body;

    // ==========================================
    // UPDATE SERVICE
    // ==========================================

    if (service !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(service)) {
        return res.status(400).json({
          success: false,
          message: "Invalid service id",
        });
      }

      const serviceExists = await Service.findById(
        service
      );

      if (!serviceExists) {
        return res.status(404).json({
          success: false,
          message:
            "Selected service does not exist",
        });
      }

      project.service = service;
    }

    // ==========================================
    // UPDATE BASIC FIELDS
    // ==========================================

    if (title !== undefined) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description = description;
    }

    if (client !== undefined) {
      project.client = client;
    }

    if (link !== undefined) {
      project.link = link;
    }

    if (order !== undefined) {
      project.order = order;
    }

    // ==========================================
    // UPDATE IMAGES
    // ==========================================

    if (
      req.files?.images &&
      req.files.images.length > 0
    ) {
      project.images = req.files.images.map(
        (file) => file.path
      );
    }

    // ==========================================
    // UPDATE VIDEO
    //
    // Priority:
    // 1. Direct Cloudinary URL
    // 2. Backend uploaded video
    // ==========================================

    if (videoUrl) {
      project.video = videoUrl;
    } else if (req.files?.video?.[0]) {
      project.video = req.files.video[0].path;
    }

    await project.save();

    const populated = await project.populate(
      "service",
      "title slug"
    );

    res.json({
      success: true,
      data: populated,
    });
  } catch (error) {
    console.error("UPDATE PORTFOLIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE PORTFOLIO PROJECT
// ==========================================

export const deletePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};