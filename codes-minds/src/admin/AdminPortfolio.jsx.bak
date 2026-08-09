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
        setProjects(portfolioRes.data?.data || portfolioRes.data || []);
        setServices(servicesRes.data?.data || servicesRes.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

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

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!form.title || !form.description || !form.service) {
      setError("Title, description aur service zaroori hain");
      setSaving(false);
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("service", form.service);
    fd.append("client", form.client);
    fd.append("link", form.link);
    fd.append("order", form.order);
    imageFiles.forEach((file) => fd.append("images", file));
    if (videoFile) fd.append("video", videoFile);

    try {
      if (editing) {
        await updatePortfolio(editing._id, fd);
      } else {
        await createPortfolio(fd);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    try {
      await deletePortfolio(project._id);
      load();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to delete");
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Portfolio</h1>
          <p>Manage your project gallery — images and videos, linked to a service.</p>
        </div>
        <button className="admin-add-btn" onClick={openCreate}>
          <Plus size={16} /> Add Project
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.images?.[0] ? (
                      <img
                        className="admin-table__thumb"
                        src={resolveImage(p.images[0])}
                        alt={p.title}
                      />
                    ) : (
                      <div className="admin-table__thumb" />
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td>{p.service?.title || "-"}</td>
                  <td>{p.client || "-"}</td>
                  <td>{p.order}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-icon-btn" onClick={() => openEdit(p)}>
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        onClick={() => handleDelete(p)}
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
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>{editing ? "Edit Project" : "Add Project"}</h3>
              <button className="admin-modal__close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form__row">
                <div>
                  <label>Service</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    required
                  >
                    <option value="">Select service</option>
                    {services.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-form__row">
                <div>
                  <label>Client (optional)</label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                  />
                </div>
                <div>
                  <label>Link (optional)</label>
                  <input
                    type="text"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label>Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImageFiles(Array.from(e.target.files))}
                />
                {editing && (
                  <p className="admin-form__hint">
                    Naya select karoge to purani saari images replace ho jayengi.
                  </p>
                )}
                {editing?.images?.length > 0 && imageFiles.length === 0 && (
                  <div className="admin-form__preview-row">
                    {editing.images.map((img, i) => (
                      <img
                        key={i}
                        className="admin-form__preview"
                        src={resolveImage(img)}
                        alt=""
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label>Video (optional)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
                {editing && (
                  <p className="admin-form__hint">
                    Naya select karoge to purani video replace ho jayegi.
                  </p>
                )}
                {editing?.video && !videoFile && (
                  <video
                    className="admin-form__preview"
                    src={resolveImage(editing.video)}
                    controls
                  />
                )}
              </div>

              {error && <p className="admin-form__error">{error}</p>}

              <div className="admin-form__actions">
                <button type="button" className="admin-btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
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