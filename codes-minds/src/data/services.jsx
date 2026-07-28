import {
  Code2,
  Globe,
  Palette,
  PenTool,
  Video,
  ShoppingCart,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export const services = [
  {
    id: 1,
    slug: "web-development",
    heroImage: "/services/web-development.jpg",
    icon: Code2,
    color: "violet",
    title: "Web Development",
    shortDesc:
      "Fast, secure & scalable websites built with modern technologies for your business.",
    heroLines: ["Powerful Websites.", "Built For", "Success."],
    heroHighlight: "Success.",
    heroDesc:
      "We build fast, secure, scalable and responsive websites that not only look amazing but also deliver real results for your business.",
    heroFeatures: [
      "Modern & Clean Design",
      "Fully Responsive Layout",
      "SEO Friendly & Fast Performance",
      "Secure & Scalable Code",
    ],
    stats: [
      { value: "150+", label: "Websites Delivered" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "5+", label: "Years Experience" },
      { value: "24/7", label: "Support Available" },
    ],
    offerings: [
      {
        title: "Custom Website Development",
        desc: "We build custom websites from scratch that are unique, modern and aligned with your brand.",
        features: [
          "Unique & Modern Design",
          "Clean & Optimized Code",
          "Scalable & Secure",
        ],
      },
      {
        title: "WordPress Development",
        desc: "Get powerful, flexible and easy to manage websites using WordPress CMS.",
        features: [
          "Theme Customization",
          "Plugin Development",
          "WooCommerce Integration",
        ],
      },
      {
        title: "E-Commerce Development",
        desc: "We build secure and high-converting e-commerce websites that grow your online business.",
        features: [
          "Shopify / WooCommerce",
          "Payment Gateway",
          "Product Management",
        ],
      },
      {
        title: "Web Application Development",
        desc: "We develop dynamic web applications with powerful features and smooth performance.",
        features: ["Custom Web Apps", "API Development", "Admin Dashboards"],
      },
    ],
    process: [
      {
        title: "Discover",
        desc: "We understand your business, goals and requirements.",
      },
      {
        title: "Plan & Strategy",
        desc: "We plan the best strategy and structure.",
      },
      {
        title: "Design",
        desc: "We create modern, secure UI/UX designs that convert.",
      },
      {
        title: "Development",
        desc: "We build clean, scalable and secure code.",
      },
      {
        title: "Testing",
        desc: "We test thoroughly for performance, security and compatibility.",
      },
      {
        title: "Launch & Support",
        desc: "We launch your website and provide ongoing support.",
      },
    ],
    tools: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "PHP", "MySQL"],
  },
  {
    id: 2,
    slug: "wordpress-development",
    heroImage: "/services/wordpress-development.jpg",
    icon: Globe,
    color: "blue",
    title: "WordPress Development",
    shortDesc:
      "SEO-friendly, responsive WordPress websites that are easy to manage.",
    heroLines: ["Powerful Websites.", "Built With", "WordPress."],
    heroHighlight: "WordPress.",
    heroDesc:
      "We create astonishing, fast, secure and fully customizable WordPress websites that help your business grow, engage audience and deliver real results.",
    heroFeatures: [
      "Modern Design",
      "SEO Friendly",
      "Fully Responsive",
      "Easy to Manage",
    ],
    stats: [
      { value: "150+", label: "WordPress Projects" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "5+", label: "Years Experience" },
      { value: "24/7", label: "Support Available" },
    ],
    offerings: [
      {
        title: "Custom WordPress Website Development",
        desc: "Bespoke WordPress websites designed to match your brand and goals.",
        features: [],
      },
      {
        title: "Theme Development & Customization",
        desc: "Custom themes built from scratch or customized to fit your business needs.",
        features: [],
      },
      {
        title: "Plugin Development & Integration",
        desc: "Custom plugin development and third-party plugin integration.",
        features: [],
      },
      {
        title: "WooCommerce Development",
        desc: "Build powerful online stores with WooCommerce for a seamless shopping experience.",
        features: [],
      },
      {
        title: "Website Migration to WordPress",
        desc: "Migrate your website safely without losing data or SEO rankings.",
        features: [],
      },
      {
        title: "Speed Optimization",
        desc: "Improve website speed and performance for better user experience.",
        features: [],
      },
      {
        title: "SEO & Security Optimization",
        desc: "On-page SEO, security setup and best practices for a safe, ranking-ready website.",
        features: [],
      },
      {
        title: "Maintenance & Support",
        desc: "Ongoing maintenance, updates and support to keep your site running smoothly.",
        features: [],
      },
    ],
    process: [
      {
        title: "Discovery",
        desc: "We understand your business, goals and requirements.",
      },
      {
        title: "Plan & Strategy",
        desc: "We plan the structure, design and functionality.",
      },
      {
        title: "Design",
        desc: "We create a modern, unique and user-friendly design.",
      },
      {
        title: "Development",
        desc: "We build your WordPress site with clean and efficient code.",
      },
      {
        title: "Testing",
        desc: "We test everything for speed, security and performance.",
      },
      {
        title: "Launch & Support",
        desc: "We launch your site and provide ongoing support.",
      },
    ],
    tools: [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "ACF",
      "RankMath",
      "WP Rocket",
      "LiteSpeed",
    ],
  },
  {
    id: 3,
    slug: "ui-ux-design",
    heroImage: "/services/ui-ux-design.jpg",
    icon: Palette,
    color: "teal",
    title: "UI/UX Design",
    shortDesc:
      "Creative, user-centered designs that enhance user experience and drive engagement.",
    heroLines: ["Designing Experiences", "Users", "Love"],
    heroHighlight: "Love",
    heroDesc:
      "We create intuitive, engaging and user-centered digital experiences that not only look stunning but also deliver real results for your business.",
    heroFeatures: [
      "User-Centered Approach",
      "Modern & Clean Aesthetics",
      "Pixel Perfect Design",
      "High Converting Designs",
    ],
    stats: [
      { value: "150+", label: "Projects Completed" },
      { value: "80+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
      { value: "99%", label: "Client Satisfaction" },
      { value: "100%", label: "Focus On Quality" },
    ],
    offerings: [
      {
        title: "User Research & Analysis",
        desc: "We understand your users and business goals to create meaningful digital solutions.",
        features: ["User Research", "Competitor Analysis", "User Personas"],
      },
      {
        title: "Wireframing & Prototyping",
        desc: "We create low & high-fidelity wireframes and prototypes to visualize ideas early.",
        features: [
          "Low Fidelity Wireframes",
          "High Fidelity Prototypes",
          "Interactive Prototype",
        ],
      },
      {
        title: "UI Design",
        desc: "We design clean, modern and pixel-perfect interfaces that enhance user experience.",
        features: [
          "Pixel Perfect Design",
          "Design System",
          "Typography & Color",
        ],
      },
      {
        title: "Mobile App Design",
        desc: "We design intuitive and engaging mobile experiences that users love.",
        features: [
          "iOS & Android Design",
          "App UI Design",
          "UX Best Practices",
        ],
      },
      {
        title: "Dashboard & Web App Design",
        desc: "We design powerful dashboards and web applications that are easy to use and scalable.",
        features: [
          "Dashboard UI/UX",
          "SaaS Product Design",
          "Data Visualization",
        ],
      },
      {
        title: "Redesign & UX Optimization",
        desc: "We improve existing designs to boost usability, engagement and conversions.",
        features: ["UX Audit", "Conversion Optimization", "Visual Redesign"],
      },
    ],
    process: [
      {
        title: "Discover",
        desc: "We understand your business, goals and user needs.",
      },
      {
        title: "Define",
        desc: "We analyze and define the right strategy for your product.",
      },
      {
        title: "Ideate",
        desc: "We brainstorm and create wireframes & user flows.",
      },
      {
        title: "Design",
        desc: "We design beautiful UI with a user-centric approach.",
      },
      {
        title: "Prototype",
        desc: "We build interactive prototypes for testing and feedback.",
      },
      {
        title: "Deliver",
        desc: "We deliver final designs that are ready for development.",
      },
    ],
    tools: [
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "Sketch",
      "InVision",
    ],
  },
  {
    id: 4,
    slug: "graphic-design",
    heroImage: "/services/graphic-design.jpg",
    icon: PenTool,
    color: "pink",
    title: "Graphic Design",
    shortDesc:
      "Eye-catching visuals that communicate your brand message effectively.",
    heroLines: ["Creative Designs.", "Powerful", "Impressions."],
    heroHighlight: "Impressions.",
    heroDesc:
      "We create stunning visual designs that communicate your brand message, captivate your audience and leave a lasting impression.",
    heroFeatures: [
      "Creative & Unique Designs",
      "Unlimited Revisions",
      "High Quality Deliverables",
      "On-Time Delivery",
    ],
    stats: [
      { value: "250+", label: "Projects Completed" },
      { value: "150+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
      { value: "99%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Available" },
    ],
    offerings: [
      {
        title: "Logo Design",
        desc: "Unique & professional logos that represent your brand identity perfectly.",
        features: ["Custom Logo Design", "Brand Identity", "Logo Redesign"],
      },
      {
        title: "Brand Identity Design",
        desc: "Build a strong brand presence with cohesive and creative identity designs.",
        features: ["Business Cards", "Letterheads", "Brand Guidelines"],
      },
      {
        title: "Social Media Design",
        desc: "Engaging social media posts and creatives that boost engagement.",
        features: [
          "Post & Banner Design",
          "Stories & Reels Design",
          "Ad Creatives",
        ],
      },
      {
        title: "Poster & Flyer Design",
        desc: "Stunning posters and flyers that grab attention and communicate clearly.",
        features: ["Event Posters", "Promotional Flyers", "Print Ready Files"],
      },
      {
        title: "Packaging Design",
        desc: "Creative packaging that makes your product stand out on the shelf.",
        features: ["Product Packaging", "Label Design", "Box Design"],
      },
      {
        title: "Illustration Design",
        desc: "Custom illustrations that bring your ideas to life with creativity.",
        features: ["Digital Illustration", "Vector Art", "Character Design"],
      },
    ],
    process: [
      {
        title: "Discover",
        desc: "We understand your needs, goals and target audience.",
      },
      {
        title: "Plan & Research",
        desc: "We analyze and plan the best design strategy.",
      },
      {
        title: "Concept & Design",
        desc: "Our designers create creative concepts tailored to your brand.",
      },
      {
        title: "Review & Refine",
        desc: "We share drafts and refine based on your feedback.",
      },
      {
        title: "Finalize",
        desc: "Final design is perfected and approved by you.",
      },
      {
        title: "Deliver",
        desc: "High-quality files delivered on time, every time.",
      },
    ],
    tools: [
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Canva",
      "CorelDRAW",
      "Figma",
    ],
  },
  {
    id: 5,
    slug: "video-editing",
    heroImage: "/services/video-editing.jpg",
    icon: Video,
    color: "orange",
    title: "Video Editing",
    shortDesc:
      "Professional video editing that engages, inspires and drives results.",
    heroLines: ["Edit. Elevate.", "Engage.", "We Bring Your Vision To Life."],
    heroHighlight: "We Bring Your Vision To Life.",
    heroDesc:
      "From raw footage to remarkable stories, we craft engaging videos that captivate your audience and grow your brand.",
    heroFeatures: [
      "Cinematic Quality",
      "Fast Turnaround Time",
      "Unlimited Revisions",
      "100% Client Satisfaction",
    ],
    stats: [
      { value: "300+", label: "Videos Delivered" },
      { value: "150+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
      { value: "99%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Available" },
    ],
    offerings: [
      {
        title: "YouTube Video Editing",
        desc: "Engaging edits that increase watch time and grow your YouTube channel.",
        features: [
          "Vlogs & Talking Videos",
          "Gaming Videos",
          "Top 10 / Cash Cow Videos",
        ],
      },
      {
        title: "Short Form Video Editing",
        desc: "Scroll-stopping short videos for Reels, Shorts, TikTok & more.",
        features: ["Instagram Reels", "YouTube Shorts", "TikTok Videos"],
      },
      {
        title: "Corporate Video Editing",
        desc: "Professional videos for your business, brand and marketing needs.",
        features: ["Promotional Videos", "Training Videos", "Brand Stories"],
      },
      {
        title: "Motion Graphics & Animation",
        desc: "Bring your ideas to life with stunning motion graphics and animations.",
        features: [
          "Logo Animations",
          "Kinetic Typography",
          "Lower Thirds / Intros",
        ],
      },
      {
        title: "Color Grading & Correction",
        desc: "Cinematic color grading that enhances the mood and quality of your video.",
        features: ["Color Correction", "Cinematic Look", "LUTs & Filters"],
      },
      {
        title: "Audio Editing & Sound Design",
        desc: "Crisp, clear and professional audio that makes your videos sound perfect.",
        features: ["Noise Reduction", "Background Music", "Sound Effects"],
      },
    ],
    process: [
      {
        title: "Discover",
        desc: "We understand your vision, goals and requirements.",
      },
      {
        title: "Plan & Organize",
        desc: "We review your footage and plan the best editing approach.",
      },
      {
        title: "Edit & Enhance",
        desc: "We cut, trim, add effects, transitions and bring your story to life.",
      },
      {
        title: "Color & Audio",
        desc: "We perfect colors and audio to create a cinematic experience.",
      },
      {
        title: "Review & Refine",
        desc: "You review and we make revisions until you're 100% satisfied.",
      },
      {
        title: "Deliver",
        desc: "Final video delivered in the format you need, on time!",
      },
    ],
    tools: [
      "Adobe Premiere Pro",
      "After Effects",
      "Photoshop",
      "Audition",
      "DaVinci Resolve",
      "CapCut",
    ],
  },
  {
    id: 6,
    slug: "ecommerce-solutions",
    heroImage: "/services/ecommerce-solutions.jpg",
    icon: ShoppingCart,
    color: "gold",
    title: "E-Commerce Solutions",
    shortDesc:
      "Powerful e-commerce stores that convert visitors into loyal customers.",
    heroLines: ["Powerful Stores.", "Limitless", "Growth."],
    heroHighlight: "Growth.",
    heroDesc:
      "We build high-converting, secure and scalable e-commerce websites that drive sales, enhance customer experience and grow your business online.",
    heroFeatures: [
      "High Converting Stores",
      "Secure & Scalable Platforms",
      "Seamless Shopping Experience",
      "Growth Focused Solutions",
    ],
    stats: [
      { value: "200+", label: "Stores Built" },
      { value: "150+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
      { value: "99%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Available" },
    ],
    offerings: [
      {
        title: "E-commerce Website Development",
        desc: "Custom e-commerce websites built for performance, user experience and conversions.",
        features: [
          "Custom Store Design",
          "Responsive & Mobile Friendly",
          "SEO Optimized",
        ],
      },
      {
        title: "Store Design & Customization",
        desc: "Unique, modern and branded store designs that build trust and boost sales.",
        features: [
          "Theme Customization",
          "Brand-Focused Design",
          "UX/UI Optimization",
        ],
      },
      {
        title: "Product & Inventory Management",
        desc: "Efficient product management systems for smooth store operations.",
        features: [
          "Product Upload & Setup",
          "Inventory Control",
          "Bulk Import/Export",
        ],
      },
      {
        title: "Payment Gateway Integration",
        desc: "Secure payment gateway integration for safe and hassle-free transactions.",
        features: [
          "Multiple Payment Options",
          "SSL & Security Setup",
          "Fraud Protection",
        ],
      },
      {
        title: "SEO & Marketing Integration",
        desc: "SEO and marketing tools integration to bring traffic and increase sales.",
        features: ["On-Page SEO", "Speed Optimization", "Google Analytics"],
      },
      {
        title: "Maintenance & Support",
        desc: "Ongoing support to keep your store running perfectly.",
        features: [
          "Regular Updates",
          "Bug Fixes & Security",
          "Backup & Recovery",
        ],
      },
    ],
    process: [
      {
        title: "Research",
        desc: "We analyze your business, market and competitors.",
      },
      {
        title: "Plan & Strategy",
        desc: "We create a strategy aligned with your goals.",
      },
      {
        title: "Design",
        desc: "We design a stunning store with great user experience.",
      },
      {
        title: "Development",
        desc: "We build a secure, fast and scalable store.",
      },
      {
        title: "Testing",
        desc: "We test thoroughly for performance and security.",
      },
      {
        title: "Launch & Support",
        desc: "We launch your store and provide ongoing support.",
      },
    ],
    tools: [
      "WooCommerce",
      "Shopify",
      "Magento",
      "WiX",
      "BigCommerce",
      "PrestaShop",
    ],
  },
  {
    id: 7,
    slug: "seo-optimization",
    heroImage: "/services/seo-optimization.jpg",
    icon: TrendingUp,
    color: "green",
    title: "SEO Optimization",
    shortDesc:
      "Rank higher, get found faster and grow your business with result-driven SEO.",
    heroLines: ["Rank Higher.", "Get Found.", "Grow Faster."],
    heroHighlight: "Get Found.",
    heroDesc:
      "Our data-driven SEO strategies help your website rank higher on search engines, attract the right audience, and drive sustainable organic growth.",
    heroFeatures: [
      "Higher Rankings",
      "More Organic Traffic",
      "Better Conversions",
      "Long-Term Growth",
    ],
    stats: [
      { value: "200+", label: "Websites Optimized" },
      { value: "150+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
      { value: "99%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Available" },
    ],
    offerings: [
      {
        title: "Keyword Research & Strategy",
        desc: "Find the right keywords your customers are searching for.",
        features: [
          "Keyword Analysis",
          "Competitor Research",
          "Search Intent Mapping",
        ],
      },
      {
        title: "On-Page SEO Optimization",
        desc: "Optimize your website content and structure for search engines.",
        features: [
          "Meta Tags Optimization",
          "Content Optimization",
          "Internal Linking",
        ],
      },
      {
        title: "Technical SEO Audit",
        desc: "Fix technical issues and improve website performance.",
        features: [
          "Site Audit",
          "Fix Crawl Errors",
          "XML Sitemap & Robots.txt",
        ],
      },
      {
        title: "Off-Page SEO & Link Building",
        desc: "Build high-quality backlinks and increase domain authority.",
        features: ["Quality Backlinks", "Guest Posting", "Outreach Campaigns"],
      },
      {
        title: "Content SEO Optimization",
        desc: "Create and optimize content that ranks and converts.",
        features: [
          "SEO Content Writing",
          "Blog Optimization",
          "Content Strategy",
        ],
      },
      {
        title: "Local SEO Optimization",
        desc: "Rank higher in local searches and Google Maps.",
        features: [
          "Google My Business",
          "Local Citations",
          "Review Management",
        ],
      },
    ],
    process: [
      {
        title: "Research & Analysis",
        desc: "We analyze your website, competitors and market to find opportunities.",
      },
      {
        title: "Strategy & Planning",
        desc: "We create a customized SEO strategy tailored to your business goals.",
      },
      {
        title: "Optimization",
        desc: "We optimize your website content, structure and technical elements.",
      },
      {
        title: "Implementation",
        desc: "We implement on-page and technical SEO improvements.",
      },
      {
        title: "Monitoring & Tracking",
        desc: "We track rankings, traffic and performance using advanced tools.",
      },
      {
        title: "Reporting & Growth",
        desc: "We provide regular reports and continuous optimization for better results.",
      },
    ],
    tools: [
      "Google Search Console",
      "Google Analytics",
      "SEMrush",
      "Ahrefs",
      "Ubersuggest",
      "Moz",
      "Screaming Frog",
      "RankMath",
    ],
  },
  {
    id: 8,
    slug: "website-maintenance",
    heroImage: "/services/website-maintenance.jpg",
    icon: ShieldCheck,
    color: "skyblue",
    title: "Website Maintenance",
    shortDesc:
      "We keep your website secure, updated and running at its best performance.",
    heroLines: ["We Keep Your Website", "Secure, Updated &", "Always Running."],
    heroHighlight: "Secure, Updated &",
    heroDesc:
      "We provide reliable website maintenance services to keep your website secure, up-to-date, fast and error-free — so you can focus on growing your business.",
    heroFeatures: [
      "Regular Updates & Backups",
      "Top-notch Security Monitoring",
      "Performance Optimization",
      "24/7 Uptime Monitoring",
    ],
    stats: [
      { value: "150+", label: "Websites Maintained" },
      { value: "99.9%", label: "Uptime Guarantee" },
      { value: "5+", label: "Years Experience" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Available" },
    ],
    offerings: [
      {
        title: "Regular Updates & Management",
        desc: "We keep your CMS, themes and plugins up-to-date for a smooth experience.",
        features: [
          "WordPress Core Updates",
          "Plugin & Theme Updates",
          "Compatibility Check",
        ],
      },
      {
        title: "Security & Malware Protection",
        desc: "We protect your website from threats, attacks and malware 24/7.",
        features: ["Malware Scanning", "Firewall Protection", "Login Security"],
      },
      {
        title: "Backup & Disaster Recovery",
        desc: "We take regular backups and ensure you never lose your important data.",
        features: [
          "Daily/Weekly Backups",
          "Cloud Storage",
          "One-click Restore",
        ],
      },
      {
        title: "Performance Optimization",
        desc: "We optimize your website speed for better performance and user experience.",
        features: [
          "Speed Optimization",
          "Image Optimization",
          "Database Cleanup",
        ],
      },
      {
        title: "Uptime Monitoring & Reporting",
        desc: "We monitor your website 24/7 and offer detailed maintenance reports.",
        features: ["24/7 Monitoring", "Uptime Alerts", "Monthly Reports"],
      },
      {
        title: "Bug Fixing & Support",
        desc: "We fix issues quickly and provide continuous support whenever you need.",
        features: ["Bug Fixes", "Broken Links Check", "Technical Support"],
      },
    ],
    process: [
      {
        title: "Monitor",
        desc: "We monitor your website 24/7 for uptime, speed and security.",
      },
      {
        title: "Analyze",
        desc: "We analyze issues, errors and improvements needed.",
      },
      {
        title: "Update & Optimize",
        desc: "We update, optimize and secure your website regularly.",
      },
      {
        title: "Backup & Protect",
        desc: "We take backups and keep your website protected.",
      },
      {
        title: "Report",
        desc: "We send you regular reports and performance insights.",
      },
      {
        title: "You Grow",
        desc: "You focus on your business while we handle the rest.",
      },
    ],
    tools: [
      "WordPress",
      "PHP",
      "MySQL",
      "cPanel",
      "Cloudflare",
      "Jetpack",
      "Elementor",
      "WooCommerce",
    ],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
