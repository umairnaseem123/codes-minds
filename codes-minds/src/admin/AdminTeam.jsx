import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { getTeam, createTeam, updateTeam, deleteTeam } from "../api/team";
import { resolveImage } from "../api/config";
import "./admin.css";

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  order: 0,
  linkedin: "",
  github: "",
  twitter: "",
};

function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getTeam()
      .then((res) => setMembers(res.data))
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

  const openEdit = (member) => {
    setEditing(member);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      order: member.order ?? 0,
      linkedin: member.socials?.linkedin || "",
      github: member.socials?.github || "",
      twitter: member.socials?.twitter || "",
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
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("bio", form.bio);
    fd.append("order", form.order);
    fd.append("linkedin", form.linkedin);
    fd.append("github", form.github);
    fd.append("twitter", form.twitter);
    if (imageFile) fd.append("image", imageFile);

    try {
      if (editing) {
        await updateTeam(editing._id, fd);
      } else {
        await createTeam(fd);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.message || "Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member) => {
    if (!window.confirm(`Remove "${member.name}"?`)) return;
    try {
      await deleteTeam(member._id);
      load();
    } catch (err) {
      alert(err.message || "Failed to delete team member");
    }
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Team</h1>
          <p>Manage the team members shown on your About page.</p>
        </div>
        <button className="admin-add-btn" onClick={openCreate}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : members.length === 0 ? (
          <div className="admin-empty">No team members yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Role</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id}>
                  <td>
                    {m.image ? (
                      <img
                        className="admin-table__thumb"
                        src={resolveImage(m.image)}
                        alt={m.name}
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <div className="admin-table__thumb" style={{ borderRadius: "50%" }} />
                    )}
                  </td>
                  <td>{m.name}</td>
                  <td>{m.role}</td>
                  <td>{m.order}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-icon-btn" onClick={() => openEdit(m)}>
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        onClick={() => handleDelete(m)}
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
              <h3>{editing ? "Edit Team Member" : "Add Team Member"}</h3>
              <button className="admin-modal__close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form__row">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Bio (optional)</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>
              <div className="admin-form__row">
                <div>
                  <label>LinkedIn (optional)</label>
                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  />
                </div>
                <div>
                  <label>GitHub (optional)</label>
                  <input
                    type="url"
                    value={form.github}
                    onChange={(e) => setForm({ ...form, github: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-form__row">
                <div>
                  <label>Twitter (optional)</label>
                  <input
                    type="url"
                    value={form.twitter}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                  />
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
                <label>Photo</label>
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
                    style={{ borderRadius: "50%" }}
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

export default AdminTeam;
