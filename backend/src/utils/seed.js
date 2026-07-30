import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import Service from "../models/Service.js";
import mongoose from "mongoose";

// The 8 core Codes Minds services — matches what's already live on the frontend.
// "icon" is just a keyword the frontend can map to its own icon component.
const services = [
  {
    title: "Web Development",
    description:
      "Fast, secure & scalable websites built with modern technologies for your business.",
    icon: "code",
    order: 1,
  },
  {
    title: "WordPress Development",
    description:
      "SEO-friendly, responsive WordPress websites that are easy to manage.",
    icon: "globe",
    order: 2,
  },
  {
    title: "UI/UX Design",
    description:
      "Creative, user-centered designs that enhance user experience and drive engagement.",
    icon: "palette",
    order: 3,
  },
  {
    title: "Graphic Design",
    description:
      "Eye-catching visuals that communicate your brand message effectively.",
    icon: "pen-tool",
    order: 4,
  },
  {
    title: "Video Editing",
    description:
      "Professional video editing that engages, inspires and drives results.",
    icon: "video",
    order: 5,
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Powerful e-commerce stores that convert visitors into loyal customers.",
    icon: "shopping-cart",
    order: 6,
  },
  {
    title: "SEO Optimization",
    description:
      "Rank higher, get found faster and grow your business with result-driven SEO.",
    icon: "trending-up",
    order: 7,
  },
  {
    title: "Website Maintenance",
    description:
      "We keep your website secure, updated and running at its best performance.",
    icon: "shield",
    order: 8,
  },
];

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env",
    );
    process.exit(1);
  }

  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    console.log(`Admin already exists for ${ADMIN_EMAIL}. Skipping.`);
  } else {
    await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
    });
    console.log(`Admin account created for ${ADMIN_EMAIL}`);
  }
};

const seedServices = async () => {
  const existingCount = await Service.countDocuments();

  if (existingCount > 0) {
    console.log(
      `Services collection already has ${existingCount} document(s). Skipping.`,
    );
    return;
  }

  await Service.insertMany(services);
  console.log(`${services.length} services seeded successfully.`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await seedAdmin();
    await seedServices();
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

runSeed();
