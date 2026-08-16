[1mdiff --git a/backend/src/controllers/portfolioController.js b/backend/src/controllers/portfolioController.js[m
[1mindex 47082dd..754f530 100644[m
[1m--- a/backend/src/controllers/portfolioController.js[m
[1m+++ b/backend/src/controllers/portfolioController.js[m
[36m@@ -2,8 +2,10 @@[m [mimport mongoose from "mongoose";[m
 import Portfolio from "../models/Portfolio.js";[m
 import Service from "../models/Service.js";[m
 [m
[31m-// @route GET /api/portfolio[m
[31m-// @access Public[m
[32m+[m[32m// ==========================================[m
[32m+[m[32m// GET ALL PORTFOLIO PROJECTS[m
[32m+[m[32m// ==========================================[m
[32m+[m
 export const getPortfolio = async (req, res) => {[m
   try {[m
     const filter = {};[m
[36m@@ -30,7 +32,10 @@[m [mexport const getPortfolio = async (req, res) => {[m
 [m
     const projects = await Portfolio.find(filter)[m
       .populate("service", "title slug")[m
[31m-      .sort({ order: 1, createdAt: -1 });[m
[32m+[m[32m      .sort({[m
[32m+[m[32m        order: 1,[m
[32m+[m[32m        createdAt: -1,[m
[32m+[m[32m      });[m
 [m
     res.json({[m
       success: true,[m
[36m@@ -45,14 +50,15 @@[m [mexport const getPortfolio = async (req, res) => {[m
   }[m
 };[m
 [m
[31m-// @route GET /api/portfolio/:id[m
[31m-// @access Public[m
[32m+[m[32m// ==========================================[m
[32m+[m[32m// GET SINGLE PORTFOLIO PROJECT[m
[32m+[m[32m// ==========================================[m
[32m+[m
 export const getPortfolioById = async (req, res) => {[m
   try {[m
[31m-    const project = await Portfolio.findById(req.params.id).populate([m
[31m-      "service",[m
[31m-      "title slug",[m
[31m-    );[m
[32m+[m[32m    const project = await Portfolio.findById([m
[32m+[m[32m      req.params.id[m
[32m+[m[32m    ).populate("service", "title slug");[m
 [m
     if (!project) {[m
       return res.status(404).json({[m
[36m@@ -73,19 +79,27 @@[m [mexport const getPortfolioById = async (req, res) => {[m
   }[m
 };[m
 [m
[31m-// @route POST /api/portfolio[m
[31m-// Files:[m
[31m-// images = multiple images[m
[31m-// video = single video[m
[31m-// @access Private (admin)[m
[32m+[m[32m// ==========================================[m
[32m+[m[32m// CREATE PORTFOLIO PROJECT[m
[32m+[m[32m// ==========================================[m
[32m+[m
 export const createPortfolio = async (req, res) => {[m
   try {[m
[31m-    const { title, description, service, client, link, order } = req.body;[m
[32m+[m[32m    const {[m
[32m+[m[32m      title,[m
[32m+[m[32m      description,[m
[32m+[m[32m      service,[m
[32m+[m[32m      client,[m
[32m+[m[32m      link,[m
[32m+[m[32m      order,[m
[32m+[m[32m      videoUrl,[m
[32m+[m[32m    } = req.body;[m
 [m
     if (!title || !description || !service) {[m
       return res.status(400).json({[m
         success: false,[m
[31m-        message: "Title, description and service are required",[m
[32m+[m[32m        message:[m
[32m+[m[32m          "Title, description and service are required",[m
       });[m
     }[m
 [m
[36m@@ -101,16 +115,33 @@[m [mexport const createPortfolio = async (req, res) => {[m
     if (!serviceExists) {[m
       return res.status(404).json({[m
         success: false,[m
[31m-        message: "Selected service does not exist",[m
[32m+[m[32m        message:[m
[32m+[m[32m          "Selected service does not exist",[m
       });[m
     }[m
 [m
[31m-    // Cloudinary URLs[m
[32m+[m[32m    // ==========================================[m
[32m+[m[32m    // IMAGES FROM BACKEND / CLOUDINARY[m
[32m+[m[32m    // ==========================================[m
[32m+[m
     const images = req.files?.images[m
       ? req.files.images.map((file) => file.path)[m
       : [];[m
 [m
[31m-    const video = req.files?.video?.[0] ? req.files.video[0].path : "";[m
[32m+[m[32m    // ==========================================[m
[32m+[m[32m    // VIDEO[m
[32m+[m[32m    // Priority:[m
[32m+[m[32m    // 1. Direct Cloudinary URL from frontend[m
[32m+[m[32m    // 2. Traditional backend uploaded video[m
[32m+[m[32m    // ==========================================[m
[32m+[m
[32m+[m[32m    let video = "";[m
[32m+[m
[32m+[m[32m    if (videoUrl) {[m
[32m+[m[32m      video = videoUrl;[m
[32m+[m[32m    } else if (req.files?.video?.[0]) {[m
[32m+[m[32m      video = req.files.video[0].path;[m
[32m+[m[32m    }[m
 [m
     const project = await Portfolio.create({[m
       title,[m
[36m@@ -123,13 +154,18 @@[m [mexport const createPortfolio = async (req, res) => {[m
       video,[m
     });[m
 [m
[31m-    const populated = await project.populate("service", "title slug");[m
[32m+[m[32m    const populated = await project.populate([m
[32m+[m[32m      "service",[m
[32m+[m[32m      "title slug"[m
[32m+[m[32m    );[m
 [m
     res.status(201).json({[m
       success: true,[m
       data: populated,[m
     });[m
   } catch (error) {[m
[32m+[m[32m    console.error("CREATE PORTFOLIO ERROR:", error);[m
[32m+[m
     res.status(500).json({[m
       success: false,[m
       message: error.message,[m
[36m@@ -137,11 +173,15 @@[m [mexport const createPortfolio = async (req, res) => {[m
   }[m
 };[m
 [m
[31m-// @route PUT /api/portfolio/:id[m
[31m-// @access Private (admin)[m
[32m+[m[32m// ==========================================[m
[32m+[m[32m// UPDATE PORTFOLIO PROJECT[m
[32m+[m[32m// ==========================================[m
[32m+[m
 export const updatePortfolio = async (req, res) => {[m
   try {[m
[31m-    const project = await Portfolio.findById(req.params.id);[m
[32m+[m[32m    const project = await Portfolio.findById([m
[32m+[m[32m      req.params.id[m
[32m+[m[32m    );[m
 [m
     if (!project) {[m
       return res.status(404).json({[m
[36m@@ -150,7 +190,19 @@[m [mexport const updatePortfolio = async (req, res) => {[m
       });[m
     }[m
 [m
[31m-    const { title, description, service, client, link, order } = req.body;[m
[32m+[m[32m    const {[m
[32m+[m[32m      title,[m
[32m+[m[32m      description,[m
[32m+[m[32m      service,[m
[32m+[m[32m      client,[m
[32m+[m[32m      link,[m
[32m+[m[32m      order,[m
[32m+[m[32m      videoUrl,[m
[32m+[m[32m    } = req.body;[m
[32m+[m
[32m+[m[32m    // ==========================================[m
[32m+[m[32m    // UPDATE SERVICE[m
[32m+[m[32m    // ==========================================[m
 [m
     if (service !== undefined) {[m
       if (!mongoose.Types.ObjectId.isValid(service)) {[m
[36m@@ -160,18 +212,25 @@[m [mexport const updatePortfolio = async (req, res) => {[m
         });[m
       }[m
 [m
[31m-      const serviceExists = await Service.findById(service);[m
[32m+[m[32m      const serviceExists = await Service.findById([m
[32m+[m[32m        service[m
[32m+[m[32m      );[m
 [m
       if (!serviceExists) {[m
         return res.status(404).json({[m
           success: false,[m
[31m-          message: "Selected service does not exist",[m
[32m+[m[32m          message:[m
[32m+[m[32m            "Selected service does not exist",[m
         });[m
       }[m
 [m
       project.service = service;[m
     }[m
 [m
[32m+[m[32m    // ==========================================[m
[32m+[m[32m    // UPDATE BASIC FIELDS[m
[32m+[m[32m    // ==========================================[m
[32m+[m
     if (title !== undefined) {[m
       project.title = title;[m
     }[m
[36m@@ -192,25 +251,47 @@[m [mexport const updatePortfolio = async (req, res) => {[m
       project.order = order;[m
     }[m
 [m
[31m-    // New images → save Cloudinary URLs[m
[31m-    if (req.files?.images && req.files.images.length > 0) {[m
[31m-      project.images = req.files.images.map((file) => file.path);[m
[32m+[m[32m    // ==========================================[m
[32m+[m[32m    // UPDATE IMAGES[m
[32m+[m[32m    // ==========================================[m
[32m+[m
[32m+[m[32m    if ([m
[32m+[m[32m      req.files?.images &&[m
[32m+[m[32m      req.files.images.length > 0[m
[32m+[m[32m    ) {[m
[32m+[m[32m      project.images = req.files.images.map([m
[32m+[m[32m        (file) => file.path[m
[32m+[m[32m      );[m
     }[m
 [m
[31m-    // New video → save Cloudinary URL[m
[31m-    if (req.files?.video?.[0]) {[m
[32m+[m[32m    // ==========================================[m
[32m+[m[32m    // UPDATE VIDEO[m
[32m+[m[32m    //[m
[32m+[m[32m    // Priority:[m
[32m+[m[32m    // 1. Direct Cloudinary URL[m
[32m+[m[32m    // 2. Backend uploaded video[m
[32m+[m[32m    // ==========================================[m
[32m+[m
[32m+[m[32m    if (videoUrl) {[m
[32m+[m[32m      project.video = videoUrl;[m
[32m+[m[32m    } else if (req.files?.video?.[0]) {[m
       project.video = req.files.video[0].path;[m
     }[m
 [m
     await project.save();[m
 [m
[31m-    const populated = await project.populate("service", "title slug");[m
[32m+[m[32m    const populated = await project.populate([m
[32m+[m[32m      "service",[m
[32m+[m[32m      "title slug"[m
[32m+[m[32m    );[m
 [m
     res.json({[m
       success: true,[m
       data: populated,[m
     });[m
   } catch (error) {[m
[32m+[m[32m    console.error("UPDATE PORTFOLIO ERROR:", error);[m
[32m+[m
     res.status(500).json({[m
       success: false,[m
       message: error.message,[m
[36m@@ -218,11 +299,15 @@[m [mexport const updatePortfolio = async (req, res) => {[m
   }[m
 };[m
 [m
[31m-// @route DELETE /api/portfolio/:id[m
[31m-// @access Private (admin)[m
[32m+[m[32m// ==========================================[m
[32m+[m[32m// DELETE PORTFOLIO PROJECT[m
[32m+[m[32m// ==========================================[m
[32m+[m
 export const deletePortfolio = async (req, res) => {[m
   try {[m
[31m-    const project = await Portfolio.findById(req.params.id);[m
[32m+[m[32m    const project = await Portfolio.findById([m
[32m+[m[32m      req.params.id[m
[32m+[m[32m    );[m
 [m
     if (!project) {[m
       return res.status(404).json({[m
[36m@@ -243,4 +328,4 @@[m [mexport const deletePortfolio = async (req, res) => {[m
       message: error.message,[m
     });[m
   }[m
[31m-};[m
[32m+[m[32m};[m
\ No newline at end of file[m
[1mdiff --git a/codes-minds/src/admin/AdminPortfolio.jsx b/codes-minds/src/admin/AdminPortfolio.jsx[m
[1mindex 6588bef..76f01f9 100644[m
[1m--- a/codes-minds/src/admin/AdminPortfolio.jsx[m
[1m+++ b/codes-minds/src/admin/AdminPortfolio.jsx[m
[36m@@ -33,6 +33,7 @@[m [mfunction AdminPortfolio() {[m
 [m
   const load = () => {[m
     setLoading(true);[m
[32m+[m
     Promise.all([getPortfolio(), getServices()])[m
       .then(([portfolioRes, servicesRes]) => {[m
         setProjects(portfolioRes.data?.data || portfolioRes.data || []);[m
[36m@@ -55,6 +56,7 @@[m [mfunction AdminPortfolio() {[m
 [m
   const openEdit = (project) => {[m
     setEditing(project);[m
[32m+[m
     setForm({[m
       title: project.title || "",[m
       description: project.description || "",[m
[36m@@ -63,46 +65,118 @@[m [mfunction AdminPortfolio() {[m
       link: project.link || "",[m
       order: project.order ?? 0,[m
     });[m
[32m+[m
     setImageFiles([]);[m
     setVideoFile(null);[m
     setError("");[m
     setModalOpen(true);[m
   };[m
 [m
[31m-  const closeModal = () => setModalOpen(false);[m
[32m+[m[32m  const closeModal = () => {[m
[32m+[m[32m    if (!saving) {[m
[32m+[m[32m      setModalOpen(false);[m
[32m+[m[32m    }[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  // ==========================================[m
[32m+[m[32m  // DIRECT VIDEO UPLOAD TO CLOUDINARY[m
[32m+[m[32m  // ==========================================[m
[32m+[m
[32m+[m[32m  const uploadVideoToCloudinary = async (file) => {[m
[32m+[m[32m    if (!file) return "";[m
[32m+[m
[32m+[m[32m    const cloudName = "o8iikg0u";[m
[32m+[m[32m    const uploadPreset = "codes_minds_videos";[m
[32m+[m
[32m+[m[32m    const cloudinaryData = new FormData();[m
[32m+[m
[32m+[m[32m    cloudinaryData.append("file", file);[m
[32m+[m[32m    cloudinaryData.append("upload_preset", uploadPreset);[m
[32m+[m
[32m+[m[32m    const response = await fetch([m
[32m+[m[32m      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,[m
[32m+[m[32m      {[m
[32m+[m[32m        method: "POST",[m
[32m+[m[32m        body: cloudinaryData,[m
[32m+[m[32m      }[m
[32m+[m[32m    );[m
[32m+[m
[32m+[m[32m    const data = await response.json();[m
[32m+[m
[32m+[m[32m    if (!response.ok) {[m
[32m+[m[32m      throw new Error([m
[32m+[m[32m        data?.error?.message || "Video upload to Cloudinary failed"[m
[32m+[m[32m      );[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    return data.secure_url;[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  // ==========================================[m
[32m+[m[32m  // SAVE PROJECT[m
[32m+[m[32m  // ==========================================[m
 [m
   const handleSubmit = async (e) => {[m
     e.preventDefault();[m
[31m-    setSaving(true);[m
[31m-    setError("");[m
 [m
     if (!form.title || !form.description || !form.service) {[m
       setError("Title, description aur service zaroori hain");[m
[31m-      setSaving(false);[m
       return;[m
     }[m
 [m
[31m-    const fd = new FormData();[m
[31m-    fd.append("title", form.title);[m
[31m-    fd.append("description", form.description);[m
[31m-    fd.append("service", form.service);[m
[31m-    fd.append("client", form.client);[m
[31m-    fd.append("link", form.link);[m
[31m-    fd.append("order", form.order);[m
[31m-    imageFiles.forEach((file) => fd.append("images", file));[m
[31m-    if (videoFile) fd.append("video", videoFile);[m
[32m+[m[32m    setSaving(true);[m
[32m+[m[32m    setError("");[m
 [m
     try {[m
[32m+[m[32m      let videoUrl = "";[m
[32m+[m
[32m+[m[32m      // Upload video directly to Cloudinary[m
[32m+[m[32m      if (videoFile) {[m
[32m+[m[32m        setError("Video Cloudinary par upload ho rahi hai...");[m
[32m+[m
[32m+[m[32m        videoUrl = await uploadVideoToCloudinary(videoFile);[m
[32m+[m
[32m+[m[32m        setError("Video successfully uploaded. Project save ho raha hai...");[m
[32m+[m[32m      }[m
[32m+[m
[32m+[m[32m      const fd = new FormData();[m
[32m+[m
[32m+[m[32m      fd.append("title", form.title);[m
[32m+[m[32m      fd.append("description", form.description);[m
[32m+[m[32m      fd.append("service", form.service);[m
[32m+[m[32m      fd.append("client", form.client);[m
[32m+[m[32m      fd.append("link", form.link);[m
[32m+[m[32m      fd.append("order", form.order);[m
[32m+[m
[32m+[m[32m      // Images still go through backend[m
[32m+[m[32m      imageFiles.forEach((file) => {[m
[32m+[m[32m        fd.append("images", file);[m
[32m+[m[32m      });[m
[32m+[m
[32m+[m[32m      // IMPORTANT:[m
[32m+[m[32m      // Only Cloudinary URL goes to backend.[m
[32m+[m[32m      // Actual video file Vercel ko nahi jati.[m
[32m+[m[32m      if (videoUrl) {[m
[32m+[m[32m        fd.append("videoUrl", videoUrl);[m
[32m+[m[32m      }[m
[32m+[m
       if (editing) {[m
         await updatePortfolio(editing._id, fd);[m
       } else {[m
         await createPortfolio(fd);[m
       }[m
[32m+[m
       setModalOpen(false);[m
[32m+[m[32m      setVideoFile(null);[m
[32m+[m[32m      setImageFiles([]);[m
[32m+[m[32m      setError("");[m
[32m+[m
       load();[m
     } catch (err) {[m
       setError([m
[31m-        err?.response?.data?.message || err.message || "Failed to save project"[m
[32m+[m[32m        err?.response?.data?.message ||[m
[32m+[m[32m          err.message ||[m
[32m+[m[32m          "Failed to save project"[m
       );[m
     } finally {[m
       setSaving(false);[m
[36m@@ -111,11 +185,16 @@[m [mfunction AdminPortfolio() {[m
 [m
   const handleDelete = async (project) => {[m
     if (!window.confirm(`Delete "${project.title}"?`)) return;[m
[32m+[m
     try {[m
       await deletePortfolio(project._id);[m
       load();[m
     } catch (err) {[m
[31m-      alert(err?.response?.data?.message || err.message || "Failed to delete");[m
[32m+[m[32m      alert([m
[32m+[m[32m        err?.response?.data?.message ||[m
[32m+[m[32m          err.message ||[m
[32m+[m[32m          "Failed to delete"[m
[32m+[m[32m      );[m
     }[m
   };[m
 [m
[36m@@ -124,8 +203,12 @@[m [mfunction AdminPortfolio() {[m
       <div className="admin-header">[m
         <div>[m
           <h1>Portfolio</h1>[m
[31m-          <p>Manage your project gallery  images and videos, linked to a service.</p>[m
[32m+[m
[32m+[m[32m          <p>[m
[32m+[m[32m            Manage your project gallery, images and videos, linked to a service.[m
[32m+[m[32m          </p>[m
         </div>[m
[32m+[m
         <button className="admin-add-btn" onClick={openCreate}>[m
           <Plus size={16} /> Add Project[m
         </button>[m
[36m@@ -148,6 +231,7 @@[m [mfunction AdminPortfolio() {[m
                 <th></th>[m
               </tr>[m
             </thead>[m
[32m+[m
             <tbody>[m
               {projects.map((p) => ([m
                 <tr key={p._id}>[m
[36m@@ -162,18 +246,29 @@[m [mfunction AdminPortfolio() {[m
                       <div className="admin-table__thumb" />[m
                     )}[m
                   </td>[m
[32m+[m
                   <td>{p.title}</td>[m
[32m+[m
                   <td>{p.service?.title || "-"}</td>[m
[32m+[m
                   <td>{p.client || "-"}</td>[m
[32m+[m
                   <td>{p.order}</td>[m
[32m+[m
                   <td>[m
                     <div className="admin-table__actions">[m
[31m-                      <button className="admin-icon-btn" onClick={() => openEdit(p)}>[m
[32m+[m[32m                      <button[m
[32m+[m[32m                        className="admin-icon-btn"[m
[32m+[m[32m                        onClick={() => openEdit(p)}[m
[32m+[m[32m                        disabled={saving}[m
[32m+[m[32m                      >[m
                         <Pencil size={15} />[m
                       </button>[m
[32m+[m
                       <button[m
                         className="admin-icon-btn admin-icon-btn--danger"[m
                         onClick={() => handleDelete(p)}[m
[32m+[m[32m                        disabled={saving}[m
                       >[m
                         <Trash2 size={15} />[m
                       </button>[m
[36m@@ -187,133 +282,237 @@[m [mfunction AdminPortfolio() {[m
       </div>[m
 [m
       {modalOpen && ([m
[31m-        <div className="admin-modal-overlay" onClick={closeModal}>[m
[31m-          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>[m
[32m+[m[32m        <div[m
[32m+[m[32m          className="admin-modal-overlay"[m
[32m+[m[32m          onClick={closeModal}[m
[32m+[m[32m        >[m
[32m+[m[32m          <div[m
[32m+[m[32m            className="admin-modal"[m
[32m+[m[32m            onClick={(e) => e.stopPropagation()}[m
[32m+[m[32m          >[m
             <div className="admin-modal__header">[m
[31m-              <h3>{editing ? "Edit Project" : "Add Project"}</h3>[m
[31m-              <button className="admin-modal__close" onClick={closeModal}>[m
[32m+[m[32m              <h3>[m
[32m+[m[32m                {editing ? "Edit Project" : "Add Project"}[m
[32m+[m[32m              </h3>[m
[32m+[m
[32m+[m[32m              <button[m
[32m+[m[32m                className="admin-modal__close"[m
[32m+[m[32m                onClick={closeModal}[m
[32m+[m[32m                disabled={saving}[m
[32m+[m[32m              >[m
                 <X size={20} /