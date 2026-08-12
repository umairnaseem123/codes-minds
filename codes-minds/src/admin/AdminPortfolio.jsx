import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../api/portfolio";
import { getServices } from "../api/services";
import { resolveImage } from "../api/config";
import { uploadToCloudinary } from "../api/uploads";
import "./admin.css";

const emptyForm = {
  title: "",
  description: "",
  service: "",
  client: "",
  link: "",
  order: 0,
};

function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);

    Promise.all([getPortfolio(), getServices()])
      .then(([portfolioRes, servicesRes]) => {
        setProjects(portfolioRes.data || []);
        setServices(servicesRes.data || []);
      })
      .catch((err) => {
        console.error("Failed to load admin data:", err);
        setError("Failed to load portfolio data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFiles([]);
    setVideoFile(null);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);

    setForm({
      title: project.title || "",
      description: project.description || "",
      service: project.service?._id || project.service || "",
      client: project.client || "",
      link: project.link || "",
      order: project.order ?? 0,
    });

    setImageFiles([]);
    setVideoFile(null);
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditing(null);
    setImageFiles([]);
    setVideoFile(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    if (!form.title.trim()) {
      setError("Project title is required");
      setSaving(false);
      return;
    }

    if (!form.description.trim()) {
      setError("Project description is required");
      setSaving(false);
      return;
    }

    if (!form.service) {
      setError("Please select a service");
      setSaving(false);
      return;
    }

    const fd = new FormData();

    fd.append("title", form.title.trim());
    fd.append("description", form.description.trim());
    fd.append("service", form.service);
    fd.append("client", form.client.trim());
    fd.append("link", form.link.trim());
    fd.append("order", String(Number(form.order) || 0));

    try {
      // Files go straight from the browser to Cloudinary. This avoids Vercel's
      // serverless request-size limit, which otherwise prevents larger videos.
      if (imageFiles.length > 0) {
        const imageUrls = await Promise.all(
          imageFiles.map((file) => uploadToCloudinary(file, "image")),
        );
        fd.append("imageUrls", JSON.stringify(imageUrls));
      }

      if (videoFile) {
        const videoUrl = await uploadToCloudinary(videoFile, "video");
        fd.append("videoUrl", videoUrl);
      }

      if (editing) {
        await updatePortfolio(editing._id, fd);
      } else {
        await createPortfolio(fd);
      }

      closeModal();
      load();
    } catch (err) {
      console.error("Portfolio save error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    try {
      await deletePortfolio(project._id);
      load();
    } catch (err) {
      console.error("Delete error:", err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete project"
      );
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Portfolio</h1>
          <p>
            Manage your projects, images and videos linked to your services.
          </p>
        </div>

        <button className="admin-add-btn" onClick={openCreate}>
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="admin-empty">No projects yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Service</th>
                <th>Client</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    {project.images?.[0] ? (
                      <img
                        className="admin-table__thumb"
                        src={resolveImage(project.images[0])}
                        alt={project.title}
                      />
                    ) : (
                      <div className="admin-table__thumb" />
                    )}
                  </td>

                  <td>{project.title}</td>

                  <td>{project.service?.title || "-"}</td>

                  <td>{project.client || "-"}</td>

                  <td>{project.order}</td>

                  <td>
                    <div className="admin-table__actions">
                      <button
                        className="admin-icon-btn"
                        onClick={() => openEdit(project)}
                        title="Edit Project"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        onClick={() => handleDelete(project)}
                        title="Delete Project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal__header">
              <h3>{editing ? "Edit Project" : "Add Project"}</h3>

              <button
                className="admin-modal__close"
                onClick={closeModal}
                disabled={saving}
              >
                <X size={20} />
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div>
                <label>Title</label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Description</label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="admin-form__row">
                <div>
                  <label>Service</label>

                  <select
                    value={form.service}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        service: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select service</option>

                    {services.map((service) => (
                      <option
                        key={service._id}
                        value={service._id}
                      >
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Order</label>

                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        order: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-form__row">
                <div>
                  <label>Client (optional)</label>

                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        client: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Link (optional)</label>

                  <input
                    type="text"
                    value={form.link}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        link: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label>Images</label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImageFiles(Array.from(e.target.files || []))
                  }
                />

                {editing && (
                  <p className="admin-form__hint">
                    Select new images only if you want to replace the
                    existing images.
                  </p>
                )}

                {imageFiles.length > 0 && (
                  <p className="admin-form__hint">
                    {imageFiles.length} new image
                    {imageFiles.length > 1 ? "s" : ""} selected.
                  </p>
                )}

                {editing?.images?.length > 0 &&
                  imageFiles.length === 0 && (
                    <div className="admin-form__preview-row">
                      {editing.images.map((img, index) => (
                        <img
                          key={index}
                          className="admin-form__preview"
                          src={resolveImage(img)}
                          alt={`Project ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
              </div>

              <div>
                <label>Video (optional)</label>

                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={(e) =>
                    setVideoFile(e.target.files?.[0] || null)
                  }
                />

                {editing && (
                  <p className="admin-form__hint">
                    Select a new video only if you want to replace the
                    existing video.
                  </p>
                )}

                {videoFile && (
                  <p className="admin-form__hint">
                    New video selected: {videoFile.name}
                  </p>
                )}

                {editing?.video && !videoFile && (
                  <video
                    className="admin-form__preview"
                    src={resolveImage(editing.video)}
                    controls
                    preload="metadata"
                  />
                )}
              </div>

              {error && (
                <p className="admin-form__error">
                  {error}
                </p>
              )}

              <div className="admin-form__actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editing
                    ? "Update Project"
                    : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPortfolio;
