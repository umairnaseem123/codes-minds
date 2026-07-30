import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../api/services";
import { resolveImage } from "../api/config";
import { iconOptions } from "../data/iconMap";
import "./admin.css";

const emptyForm = { title: "", description: "", icon: iconOptions[0], order: 0 };

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getServices()
      .then((res) => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon || iconOptions[0],
      order: service.order ?? 0,
    });
    setImageFile(null);
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("icon", form.icon);
    fd.append("order", form.order);
    if (imageFile) fd.append("image", imageFile);

    try {
      if (editing) {
        await updateService(editing._id, fd);
      } else {
        await createService(fd);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service) => {
    if (!window.confirm(`Delete "${service.title}"?`)) return;
    try {
      await deleteService(service._id);
      load();
    } catch (err) {
      alert(err.message || "Failed to delete service");
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Services</h1>
          <p>Manage the services shown on your site.</p>
        </div>
        <button className="admin-add-btn" onClick={openCreate}>
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : services.length === 0 ? (
          <div className="admin-empty">No services yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Icon</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>
                    {s.image ? (
                      <img
                        className="admin-table__thumb"
                        src={resolveImage(s.image)}
                        alt={s.title}
                      />
                    ) : (
                      <div className="admin-table__thumb" />
                    )}
                  </td>
                  <td>{s.title}</td>
                  <td>{s.icon}</td>
                  <td>{s.order}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-icon-btn" onClick={() => openEdit(s)}>
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        onClick={() => handleDelete(s)}
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
              <h3>{editing ? "Edit Service" : "Add Service"}</h3>
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
                  <label>Icon</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
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
              <div>
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                {editing?.image && !imageFile && (
                  <img
                    className="admin-form__preview"
                    src={resolveImage(editing.image)}
                    alt=""
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

export default AdminServices;
