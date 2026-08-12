import Team from "../models/Team.js";

// @route GET /api/team
// @access Public
export const getTeam = async (req, res) => {
  try {
    const members = await Team.find().sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route POST /api/team
// @access Private (admin)
export const createTeam = async (req, res) => {
  try {
    const { name, role, bio, order, linkedin, github, twitter } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: "Name and role are required",
      });
    }

    const member = await Team.create({
      name,
      role,
      bio,
      order,
      socials: {
        linkedin,
        github,
        twitter,
      },

      // Cloudinary URL
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route PUT /api/team/:id
// @access Private (admin)
export const updateTeam = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    const { name, role, bio, order, linkedin, github, twitter } = req.body;

    if (name !== undefined) member.name = name;
    if (role !== undefined) member.role = role;
    if (bio !== undefined) member.bio = bio;
    if (order !== undefined) member.order = order;

    if (linkedin !== undefined) {
      member.socials.linkedin = linkedin;
    }

    if (github !== undefined) {
      member.socials.github = github;
    }

    if (twitter !== undefined) {
      member.socials.twitter = twitter;
    }

    // New image uploaded to Cloudinary
    if (req.file) {
      member.image = req.file.path;
    }

    await member.save();

    res.json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route DELETE /api/team/:id
// @access Private (admin)
export const deleteTeam = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    await member.deleteOne();

    res.json({
      success: true,
      message: "Team member deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
